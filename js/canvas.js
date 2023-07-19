// 分辨率适配
const reize = () => {
    let curViewWidth = window.innerWidth || document.body.clientWidth;
    let defaultWidth = 1280;
    if (curViewWidth < 1280) {
        curViewWidth = 1280;
    } else if (curViewWidth > 1980) {
        curViewWidth = 1980;
    }

    let htmpPx = curViewWidth * 100 / defaultWidth;
    document.documentElement.style.fontSize = htmpPx + 'px';
    document.body.style.fontSize = 16 + 'px';
}
reize();

let timer
// canvas画文字
const drawByCanvas = () => {
    const cvs = document.querySelector("canvas");
    cvs.style.width = document.body.parentElement.scrollWidth + 'px';
    cvs.style.height = document.body.parentElement.scrollHeight + 'px';
    const ctx = cvs.getContext("2d");
    cvs.width = document.body.parentElement.scrollWidth * devicePixelRatio;
    cvs.height = document.body.parentElement.scrollHeight * devicePixelRatio;

    const fontSize = 16 * devicePixelRatio; // 字体尺寸跟随放大缩小
    ctx.font = `${fontSize}px "Roboto Mono"`; // 设置字号和字体
    ctx.textBaseline = "top"; // 顶部对齐
    const columnCount = Math.floor(cvs.width / fontSize); // 列宽
    const chartIndex = new Array(columnCount).fill(0); // 数组下标表示第几列 元素表示第几行 初始为第0行

    function draw() {
        ctx.fillStyle = 'rgba(0,0,0,0.1)'; // 设置背景颜色
        ctx.fillRect(0, 0, cvs.width, cvs.height); // 添加矩形覆盖在canvas上 逐渐使字体颜色变浅
        ctx.fillStyle = "#6be445"; // 设置字体颜色
        for (let i = 0; i < columnCount; i++) { // 循环每列
            const text = randomChart(); // 得到随机字符
            const x = i * fontSize; // x坐标
            const y = chartIndex[i] * fontSize; // y坐标
            ctx.fillText(text, x, y); // 填充文字
            // 当文字超出canvas则数组某列至0 表示第0行
            // 且开始随机数比较使数组元素表示的第几行不同
            if (y > cvs.height && Math.random() > 0.99) {
                chartIndex[i] = 0;
            } else {
                // 未超出则数组元素加1
                chartIndex[i]++;
            }
        }
    }
    // 获取随机字符
    function randomChart() {
        const str = "0123456789abcdefghijklmnopqrstuvwxwz";
        return str[Math.floor(Math.random() * str.length)];
    }
    // 计时器循环画
    timer = setInterval(draw, 20)
}
drawByCanvas()

window.onresize = () => {
    clearInterval(timer)
    reize();
    drawByCanvas();
}