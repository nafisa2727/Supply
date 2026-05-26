import React, { useMemo, useState } from "react";

const tabs = [
  { key: "messages", label: "私信页面", icon: "💬" },
  { key: "orders", label: "选择代课页面", icon: "🎒" },
  { key: "reviews", label: "教师评价页面", icon: "⭐" },
  { key: "profile", label: "个人页面", icon: "👤" },
];

const orders = [
  {
    id: "DK-20260526-001",
    title: "请代课：管理学原理",
    amount: 30,
    course: "管理学原理",
    time: "周三 10:00-11:40",
    place: "X2321 教室",
    gender: "不限",
    status: "待接单",
    publisher: "发布者：2024****018",
    note: "需要记录老师布置的作业和课堂重点。",
    applicants: [
      { name: "李同学", gender: "男", major: "信息管理", id: "2023****631", intro: "时间合适，可按要求提交课堂记录。" },
    ],
  },
  {
    id: "DK-20260526-002",
    title: "请代课：数据库原理",
    amount: 45,
    course: "数据库原理",
    time: "周五 14:00-15:40",
    place: "实验楼 506",
    gender: "男",
    status: "已匹配，待确认",
    publisher: "发布者：2022****771",
    note: "请说明实验课作业要求和签到情况。",
    applicants: [],
  },
  {
    id: "DK-20260526-003",
    title: "请代课：高等数学 A",
    amount: 25,
    course: "高等数学 A",
    time: "周一 08:20-10:00",
    place: "J1402 教室",
    gender: "女",
    status: "待接单",
    publisher: "发布者：2024****226",
    note: "请补充课堂作业说明。",
    applicants: [],
  },
];

const messages = [
  { name: "李同学", time: "14:20", text: "我看到你发布的管理学原理订单了，时间合适，可以申请。", unread: 2 },
  { name: "系统通知", time: "13:02", text: "身份认证信息仅用于模拟展示，当前原型不保存真实学生证。", unread: 0 },
  { name: "陈同学", time: "昨天", text: "我已经填写了课堂说明栏，记得确认订单状态。", unread: 0 },
];

const reviews = [
  {
    teacher: "王老师",
    course: "管理学原理",
    score: 4.7,
    tags: ["讲课清楚", "考勤一般", "作业适中"],
    content: "课堂节奏较稳定，会说明重点内容。适合提前看教材，课堂上跟着框架记录。",
  },
  {
    teacher: "陈老师",
    course: "数据库原理",
    score: 4.1,
    tags: ["考勤严格", "实验要求高", "讲案例多"],
    content: "实验课要求比较细，建议提前配置环境。平时分和实验提交关系较大。",
  },
  {
    teacher: "刘老师",
    course: "高等数学 A",
    score: 3.9,
    tags: ["节奏较快", "板书较多", "考试基础"],
    content: "课堂信息量比较大，最好提前预习。作业题和期末复习联系较明显。",
  },
];

function App() {
  const [active, setActive] = useState("orders");
  const [selectedId, setSelectedId] = useState(orders[0].id);
  const [toast, setToast] = useState("");
  const selected = orders.find((item) => item.id === selectedId) || orders[0];

  const showMock = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2400);
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="logo">代</div>
          <div>
            <h1>Campus Substitute 概念原型</h1>
            <p>私信 · 选择代课 · 教师评价 · 个人页面</p>
          </div>
        </div>
        <div className="top-badges">
          <span className="badge amber">概念展示版</span>
          <span className="badge blue">无真实支付/上传/披露</span>
        </div>
      </header>

      {toast && <div className="toast">{toast}</div>}

      <main className="layout">
        <aside className="sidebar">
          <div className="card nav-card">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                className={active === tab.key ? "nav active" : "nav"}
                onClick={() => setActive(tab.key)}
              >
                <span>{tab.icon}</span>
                <b>{tab.label}</b>
              </button>
            ))}
          </div>

          <div className="card rule-card">
            <h3>原型边界</h3>
            <p>① 页面和字段按设想展示。</p>
            <p>② 发布、接单、支付、上传均为模拟。</p>
            <p>③ 不读取学生证，不调用摄像头。</p>
            <p>④ 学号姓名仅显示脱敏占位符。</p>
          </div>
        </aside>

        <section className="content">
          {active === "messages" && <Messages />}
          {active === "orders" && (
            <Orders selected={selected} selectedId={selectedId} setSelectedId={setSelectedId} showMock={showMock} />
          )}
          {active === "reviews" && <Reviews />}
          {active === "profile" && <Profile showMock={showMock} />}
        </section>
      </main>
    </div>
  );
}

function Messages() {
  return (
    <div className="two-col">
      <section className="card">
        <h2>私信页面</h2>
        <p className="muted">展示接单沟通、订单提醒和系统通知。</p>
        <div className="list">
          {messages.map((msg) => (
            <div className="message" key={msg.name}>
              <div className="between">
                <b>{msg.name}</b>
                <span className="muted small">{msg.time}</span>
              </div>
              <p>{msg.text}</p>
              {msg.unread > 0 && <span className="badge red">{msg.unread} 条未读</span>}
            </div>
          ))}
        </div>
      </section>

      <section className="card chat">
        <h2>李同学</h2>
        <p className="muted">订单 DK-20260526-001 相关沟通</p>
        <div className="bubble left">我可以申请这个订单，性别男，专业信息管理。</div>
        <div className="bubble right">好的，我先看一下你的申请说明和认证状态。</div>
        <div className="bubble left">系统显示已认证，学号和姓名后台可查，前台只展示脱敏信息。</div>
        <div className="chat-input">
          <input placeholder="输入私信内容，原型展示用……" />
          <button disabled>发送</button>
        </div>
      </section>
    </div>
  );
}

function Orders({ selected, selectedId, setSelectedId, showMock }) {
  return (
    <div className="stack">
      <div className="stats">
        <Stat title="今日订单" value="23" />
        <Stat title="待接单" value="11" />
        <Stat title="平台抽成" value="7%" />
        <Stat title="模拟成交额" value="¥1,248" />
      </div>

      <div className="two-col">
        <div className="stack">
          <Publish showMock={showMock} />

          <section className="card">
            <h2>代课帖子列表</h2>
            <p className="muted">点击帖子查看订单详情。</p>
            <div className="list">
              {orders.map((order) => (
                <button
                  key={order.id}
                  className={selectedId === order.id ? "order active-order" : "order"}
                  onClick={() => setSelectedId(order.id)}
                >
                  <div className="between">
                    <div>
                      <b>{order.title}</b>
                      <p className="muted small">{order.time} · {order.place}</p>
                    </div>
                    <span className="price">¥{order.amount}</span>
                  </div>
                  <div className="chips">
                    <span className="badge blue">{order.status}</span>
                    <span className="badge">性别：{order.gender}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>

        <OrderDetail order={selected} showMock={showMock} />
      </div>
    </div>
  );
}

function Publish({ showMock }) {
  return (
    <section className="card">
      <h2>发布请代课帖子</h2>
      <p className="muted">字段按设想展示，提交按钮为模拟。</p>
      <div className="form">
        <Field label="代课出价金额"><input placeholder="如：30" /></Field>
        <Field label="课程时间"><input placeholder="如：周三 10:00-11:40" /></Field>
        <Field label="课程地点"><input placeholder="如：X2321 教室" /></Field>
        <Field label="课程名称"><input placeholder="如：管理学原理" /></Field>
        <Field label="性别要求">
          <select><option>不限</option><option>男</option><option>女</option></select>
        </Field>
        <Field label="说明栏"><textarea placeholder="作业说明、签到情况说明、课堂要求等……" /></Field>
        <button className="primary" onClick={() => showMock("概念展示：不会真实发布帖子")}>发布请代课帖子</button>
      </div>
    </section>
  );
}

function OrderDetail({ order, showMock }) {
  const fee = Math.round(order.amount * 0.07 * 100) / 100;
  const income = Math.round((order.amount - fee) * 100) / 100;

  return (
    <div className="stack">
      <section className="card hero-card">
        <div className="between start">
          <div>
            <div className="chips">
              <span className="badge blue">{order.status}</span>
              <span className="badge green">{order.publisher}</span>
            </div>
            <h2>{order.title}</h2>
            <p className="muted">{order.note}</p>
          </div>
          <div className="pay-box">
            <span>出价金额</span>
            <b>¥{order.amount}</b>
            <p>平台中介费 7%：¥{fee}</p>
            <p>接单人预计收入：¥{income}</p>
          </div>
        </div>

        <div className="info-grid">
          <Info label="课程名称" value={order.course} />
          <Info label="课程时间" value={order.time} />
          <Info label="课程地点" value={order.place} />
          <Info label="性别要求" value={order.gender} />
        </div>
      </section>

      <div className="two-col equal">
        <section className="card">
          <h2>去代课申请</h2>
          <p className="muted">接单人需提供性别等基本信息。</p>
          <div className="form">
            <Field label="性别"><select><option>男</option><option>女</option><option>不展示</option></select></Field>
            <Field label="专业"><input placeholder="如：信息管理" /></Field>
            <Field label="申请说明"><textarea placeholder="说明自己为什么适合接这个帖子……" /></Field>
            <button className="primary" onClick={() => showMock("概念展示：不会真实接单")}>去代课</button>
          </div>
        </section>

        <section className="card">
          <h2>申请人信息</h2>
          <p className="muted">发布者可查看申请并模拟接受。</p>
          {order.applicants.length ? (
            order.applicants.map((a) => (
              <div className="applicant" key={a.id}>
                <div className="between">
                  <div>
                    <b>{a.name}</b>
                    <p className="muted small">{a.gender} · {a.major} · {a.id}</p>
                  </div>
                  <span className="badge green">已认证</span>
                </div>
                <p>{a.intro}</p>
                <button className="primary" onClick={() => showMock("概念展示：接受后不会真实支付，也不会披露真实姓名学号")}>接受并付款</button>
              </div>
            ))
          ) : (
            <div className="empty">暂无申请人。</div>
          )}
        </section>
      </div>

      <section className="card">
        <div className="between">
          <div>
            <h2>现场凭证与下课反馈</h2>
            <p className="muted">按设想展示拍照、下课照片、说明栏，但不调用摄像头或上传。</p>
          </div>
          <span className="badge purple">凭证流程</span>
        </div>
        <div className="proof-grid">
          <Proof title="到课照片" text="概念占位：老师照片/现场照片" showMock={showMock} />
          <Proof title="下课照片" text="概念占位：下课后提交照片" showMock={showMock} />
          <div className="proof note">
            <b>说明栏</b>
            <textarea placeholder="课上作业说明、签到情况说明、其他补充……" />
          </div>
        </div>
      </section>
    </div>
  );
}

function Reviews() {
  const [kw, setKw] = useState("");
  const filtered = useMemo(() => {
    if (!kw.trim()) return reviews;
    return reviews.filter((r) => [r.teacher, r.course, r.content, ...r.tags].some((x) => String(x).includes(kw.trim())));
  }, [kw]);

  return (
    <div className="two-col">
      <section className="card">
        <h2>发表教师授课评价</h2>
        <p className="muted">学生可发表对老师授课的评价，原型不真实提交。</p>
        <div className="form">
          <Field label="老师姓名"><input placeholder="如：王老师" /></Field>
          <Field label="课程名称"><input placeholder="如：管理学原理" /></Field>
          <Field label="评分"><select><option>5 分</option><option>4 分</option><option>3 分</option><option>2 分</option><option>1 分</option></select></Field>
          <Field label="评价标签"><input placeholder="讲课清楚，考勤严格，作业较多" /></Field>
          <Field label="评价内容"><textarea placeholder="描述授课风格、作业情况、考试特点等……" /></Field>
          <button disabled>提交评价</button>
        </div>
      </section>

      <section className="stack">
        <div className="card">
          <h2>查询老师评价</h2>
          <p className="muted">输入老师姓名，查看课程体验反馈。</p>
          <input value={kw} onChange={(e) => setKw(e.target.value)} placeholder="搜索老师姓名、课程名、标签……" />
        </div>
        <div className="review-grid">
          {filtered.map((review) => (
            <div className="card" key={review.teacher}>
              <div className="between">
                <div>
                  <h3>{review.teacher}</h3>
                  <p className="muted">{review.course}</p>
                </div>
                <span className="score">{review.score} / 5</span>
              </div>
              <div className="chips">
                {review.tags.map((tag) => <span className="badge blue" key={tag}>{tag}</span>)}
              </div>
              <p>{review.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Profile({ showMock }) {
  return (
    <div className="two-col">
      <section className="stack">
        <div className="card profile-head">
          <div className="avatar">我</div>
          <div>
            <h2>当前用户</h2>
            <p className="muted">学生身份认证用户，信息仅为脱敏展示。</p>
          </div>
          <span className="badge green">已认证</span>
        </div>

        <div className="card">
          <h2>投向设置 / 通知设置</h2>
          <div className="settings">
            <Setting title="接单消息提醒" desc="有新的代课帖子或申请消息时提醒" />
            <Setting title="付款状态提醒" desc="订单被接受、付款成功、任务完成时提醒" />
            <Setting title="隐私保护" desc="姓名、学号、专业等仅在后台模拟可见" />
          </div>
        </div>
      </section>

      <section className="card">
        <h2>学生证认证</h2>
        <p className="muted">注册必须上传学生证。此处为概念展示，不读取本地文件、不保存图片。</p>
        <button className="upload" onClick={() => showMock("概念展示：不会读取或保存学生证图片")}>
          <span>🪪</span>
          <b>上传学生证</b>
          <small>用于防止外校无关人员注册</small>
        </button>
        <div className="backend">
          后台可查字段展示：姓名、学号、专业、认证状态、注册时间、订单记录、争议记录。
        </div>
      </section>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <section className="card stat">
      <span>{title}</span>
      <b>{value}</b>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label>
      <span className="label">{label}</span>
      {children}
    </label>
  );
}

function Info({ label, value }) {
  return (
    <div className="info">
      <span>{label}</span>
      <b>{value}</b>
    </div>
  );
}

function Proof({ title, text, showMock }) {
  return (
    <button className="proof" onClick={() => showMock("概念展示：不会调用摄像头或上传照片")}>
      <span>📷</span>
      <b>{title}</b>
      <small>{text}</small>
    </button>
  );
}

function Setting({ title, desc }) {
  return (
    <div className="setting">
      <div>
        <b>{title}</b>
        <p>{desc}</p>
      </div>
      <span className="switch"><i /></span>
    </div>
  );
}

export default App;
