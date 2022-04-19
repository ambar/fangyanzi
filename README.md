# 汉语方言字

<https://fangyanzi.vercel.app>

数字化教育部语保工程的《汉语方言用字规范》，其用字主要收集自《现代汉语方言大词典》。

主要修正如下：

- 标点、格式和简繁纠正
- 音标纠正，避免使用 Unicode PUA (Private Use Area)，使用网络字体优化显示
- 示例字纠正，避免使用 Unicode PUA，对扩展区（B~G）汉字使用网络字体优化显示（[字形测试页](https://fangyanzi.vercel.app/glyph)）
- 没有 Unicode 编码的字采用 SVG 图片表示

---

## npm 使用

[![npm version](https://badgen.net/npm/v/fangyanzi)](https://www.npmjs.com/package/fangyanzi)

```ts
import * as fangyanzi from 'fangyanzi'
```

---

# 原文件问题汇总

## 编码问题

- 声调全部使用 PUA
- 无编码使用 PUA 的汉字共 94 项
- 未使用编码汉字共 740 项，主要集中在扩展 B 区（Basic 9, ExtA 5, ExtB 661, ExtC 14, ExtD 2, ExtE 27, ExtF 8, ExtG 13）

## 简繁错误

混用的地区：

- 晋：晉
- 粤：粵
- 娄底：婁底
- 绩溪：績溪
- 上犹：上猶
- 温州：溫州
- 苏州：蘇州
- 厦门/厦門：廈門

除此之外没有使用繁体的地名有：益阳、邵阳、祁阳、衡阳、双峰、興业、新丰、宁都、厦门、厦門、抚州、萍乡、余干、新干、景德镇、浮梁、休宁、黄山湯口、娄煩、临桂。

## 标点错误

见：标点修正.txt

## 声调错误

- 㒼/㶒：标注错误（不一致），使用了数字
- 䉺/偈/㞎：同一 PUA 错误标记了多重声调
- 行/茈：分属厦门/北京，同一 PUA 图为 13，阳平纠正为 35

## 归类错误

字归类错误：

- 擩：为瀏陽属贛
- 弆：属贛湘
- 跉：属粵
- 䊆：为南寧
- 扽<sup>2</sup>：属平
- 𠛪<sup>2</sup>：属官平
- 𠻴<sup>2</sup>：属官吳
- 焋：湯溪属吴非徽

地区错误：

深州是河北但在客语下有字，可能为深圳客语，有三项（㤕/𥝦/𢫧）。

## 异体问题

应当统一：

- 𥮾篸
- 抯/摣/𢳛：⿰扌虘 ⿰扌⿸虍旦
- 𨵎𨵤：⿵門竒 ⿵門奇
- 𧾓𧾁：⿺走䪞 ⿺走䨿

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
