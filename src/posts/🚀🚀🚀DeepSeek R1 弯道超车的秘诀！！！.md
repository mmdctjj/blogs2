---
title: 🚀🚀🚀DeepSeek R1 弯道超车的秘诀！！！
isTimeLine: true
date: 2025-02-05
category:
  - ChatGpt
tag:
  - ChatGpt
---

### 前言

整个假期不管是视频还是公众号，都被`Deepseek R1`刷屏了，作为国人看到自己国家的大模型如此披荆斩棘，所向披靡，实在令人扬眉吐气，中国的国运到了啊！

最令人振奋的是，`Deepseek R1`训练成本仅几百万美元，而`chatgpt-4o`的训练成本约一亿美元！

所以，今天我们来看看 `DeepSeek R1` 弯道超车的秘诀！！！

> 文章同步在公众号：萌萌哒草头将军，欢迎关注

### 蒸馏模型（大白话版本）

阅读官方文档时发现提到了蒸馏模型

蒸馏模型是一种利用 `知识蒸馏（Knowledge Distillation）`技术从更大的教师模型（千亿参数规模的`LLM`）中迁移核心能力后得到的轻量化模型（学生模型）。

大白话就这么简单，专业解释可以看文末！

这类模型可以在保持高性能的同时显著降低计算成本和部署门槛。

| 模型             | 参数量 | 单次推理耗时（GPU） | 内存占用 |
| ---------------- | ------ | ------------------- | -------- |
| 教师模型（原始） | 100B   | 5000ms              | 80GB     |
| DeepSeek-R1      | 10B    | 300ms               | 8GB      |

我们举个例子，

当你问大模型：鸡兔同笼，共有头 10 个，脚 28 只，问鸡和兔各多少只？

教师模型会这么推理：

    步骤1：设鸡有x只，兔有y只。
    步骤2：根据头数，x + y = 10。
    步骤3：根据脚数，2x + 4y = 28。
    步骤4：解方程组得x=6，y=4。
    答案：鸡6只，兔4只。

蒸馏模型会模仿教师模型的推理思路，并且通过参数微调使结果输出一致：

    步骤1：总头数10，假设全是鸡，脚数为20。
    步骤2：实际脚数28，多出8只脚。
    步骤3：每只兔比鸡多2只脚，8÷2=4，因此兔有4只。
    步骤4：鸡的数量为10-4=6只。
    答案：鸡6只，兔4只。

简单地说，蒸馏模型的作用如下三点：

1.  压缩模型：减少参数量和计算成本，适合边缘部署；
2.  保留性能：继承教师模型的逻辑推理、泛化能力，性能损失小；
3.  提升效率：降低推理延迟和资源消耗，扩展至移动端、实时服务等场景。

`Deepseek R1`是基于一种更加复杂的教师模型提炼出来的推理模型，而下面这些是基于`Deepseek R1`和其他模型进一步提炼出来的学生模型。

|           **Model**           |                                   **Base Model**                                   |                                    **Download**                                    |
| :---------------------------: | :--------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------: |
| DeepSeek-R1-Distill-Qwen-1.5B |         [Qwen2.5-Math-1.5B](https://huggingface.co/Qwen/Qwen2.5-Math-1.5B)         | [🤗 HuggingFace](https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B) |
|  DeepSeek-R1-Distill-Qwen-7B  |           [Qwen2.5-Math-7B](https://huggingface.co/Qwen/Qwen2.5-Math-7B)           |  [🤗 HuggingFace](https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-7B)  |
| DeepSeek-R1-Distill-Llama-8B  |           [Llama-3.1-8B](https://huggingface.co/meta-llama/Llama-3.1-8B)           | [🤗 HuggingFace](https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Llama-8B)  |
| DeepSeek-R1-Distill-Qwen-14B  |               [Qwen2.5-14B](https://huggingface.co/Qwen/Qwen2.5-14B)               | [🤗 HuggingFace](https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-14B)  |
| DeepSeek-R1-Distill-Qwen-32B  |               [Qwen2.5-32B](https://huggingface.co/Qwen/Qwen2.5-32B)               | [🤗 HuggingFace](https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-32B)  |
| DeepSeek-R1-Distill-Llama-70B | [Llama-3.3-70B-Instruct](https://huggingface.co/meta-llama/Llama-3.3-70B-Instruct) | [🤗 HuggingFace](https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Llama-70B) |

### 📌 蒸馏模型的关键概念（专业解释）

相信下面的专业解释会令人头大，所以我放在了文末，感兴趣的小伙伴可以继续阅读！

> 知识蒸馏（Knowledge Distillation）通过教师模型生成的 **软目标（Soft Targets）**，结合 **温度参数（Temperature, T）** 平滑概率分布，并使用 **交叉熵损失（CE Loss）和 KL 散度（KL Loss）** 优化学生模型，使其在保持较小规模的同时，高效学习教师模型的知识。

#### 什么是**软目标（Soft Targets）**

传统的神经网络训练使用**硬标签（Hard Labels）**，比如手写数字识别里`“8”`就是 `100%` 属于 `“8”`类别，其他类别全是`0%`。

但教师模型的输出概率分布更丰富，比如 `“8”` 可能有 `80%` 概率属于 `“8”`，`10%` 概率属于 `“3”`，`5%` 属于 `“0”`。这种信息能帮助学生模型更好地学习类别间的关系。

#### 什么是**温度参数（Temperature, T）**

在蒸馏过程中，我们可以调整一个**温度系数** 来平滑教师模型的输出概率：

$$
p_i = \frac{e^{z_i / T}}{\sum_j e^{z_j / T}}
$$

对应的概率分布图如下：

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/260150327bc2479180ad2608c198fa3e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6JCM6JCM5ZOS6I2J5aS05bCG5Yab:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTExNjc1OTU0MzI2MDcyNyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1739447471&x-orig-sign=JYzMqbMb9CjiVPoMBmMwR8lzs9w%3D)

**较高的 T 值** 会让概率分布变得更平滑，强调类别间的相似性，让学生模型学习到更丰富的信息。

#### 什么是**损失函数（Distillation Loss）**

知识蒸馏的损失通常由两个部分组成：

- **交叉熵损失（CE Loss）** ：确保学生模型正确分类
- **KL 散度（Kullback-Leibler Divergence）** ：让学生模型的输出模仿教师模型

总体损失函数$：L = \alpha \cdot L_{CE} + (1 - \alpha) \cdot L_{KL}$

其中$\alpha$是权重系数，平衡两种损失的影响，下面是损失函数对应的损失曲线：

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/1268566760a541cf86a4f7874141e5fd~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6JCM6JCM5ZOS6I2J5aS05bCG5Yab:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTExNjc1OTU0MzI2MDcyNyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1739447471&x-orig-sign=qbQxByWxW4Vw4iwvLOFcKj%2FALW8%3D)

我们再来一个简单的例子：识别图像里的动物是猫还是狗。

教师模型给出的结果可能如下：

    步骤1: 训练教师模型，准确率：95%，给出概率分布：猫：0.9, 狗：0.1
    步骤2: 获取软目标，引入温度参数T，平滑处理之后：猫：0.8, 狗：0.2
    步骤3: 训练学生模型，将学生模型的输出与真实标签进行比较，计算交叉熵损失。
        同时，我们也计算学生模型输出与教师模型的软目标之间的KL散度。
        KL散度衡量两个概率分布之间的差异，帮助学生模型学习教师模型的知识。
        得到学生模型的损失函数。
    步骤 4: 微调学生模型：通过反向传播更新学生模型的权重，拟合教师模型的软目标。

由此得到一个学生模型，虽然它的规模更小，但是的性能得到了提升，准确率可以达到`90%`

### 总结

`DeepSeek-R1` 的成功证明，通过技术创新（如知识蒸馏、领域专注和高效架构设计），可以在低成本下实现高性能，

`DeepSeek-R1`不仅推动大模型行业从“堆参数”转向“精准优化”，也为 `AI` 落地提供更高效的路径!
