import { registerMvuSchema } from 'https://testingcf.jsdelivr.net/gh/StageDog/tavern_resource/dist/util/mvu_zod.js';

const clamp = (value, min, max) => _.clamp(Number(value || 0), min, max);
const money = value => Math.max(0, Number(value || 0));

export const schema = z.object({
  主角信息: z.object({
    姓名: z.string().prefault('陈舟'),
    年龄: z.coerce.number().prefault(24).transform(v => clamp(v, 18, 80)),
    身份: z.string().prefault('神豪系统持有者'),
    声望: z.coerce.number().prefault(10).transform(v => clamp(v, 0, 100)),
    权势: z.coerce.number().prefault(8).transform(v => clamp(v, 0, 100)),
    风险值: z.coerce.number().prefault(5).transform(v => clamp(v, 0, 100)),
    当前称号: z.string().prefault('云海新贵'),
  }).prefault({}),

  资产信息: z.object({
    现金: z.coerce.number().prefault(50000000).transform(money),
    总资产: z.coerce.number().prefault(50000000).transform(money),
    日收益: z.coerce.number().prefault(0),
    负债: z.coerce.number().prefault(0).transform(money),
    系统点数: z.coerce.number().prefault(0).transform(money),
  }).prefault({}),

  产业信息: z.record(z.string().describe('产业名称'), z.object({
    类型: z.string().prefault('未分类'),
    等级: z.coerce.number().prefault(0).transform(v => clamp(v, 0, 10)),
    估值: z.coerce.number().prefault(0).transform(money),
    日收益: z.coerce.number().prefault(0),
    状态: z.string().prefault('筹备'),
    负责人: z.string().prefault('未任命'),
  })).prefault({}),

  角色行动: z.object({
    当前位置: z.string().prefault('云海市CBD'),
    当前行为: z.string().prefault('接收神豪系统初始资产'),
    当前想法: z.string().prefault('先弄清这座城市的权力结构。'),
    当前目标: z.string().prefault('建立第一块可持续现金流产业'),
    当前着装: z.string().prefault('黑色定制西装'),
  }).prefault({}),

  能力信息: z.object({
    资本: z.object({ 数值: z.coerce.number().prefault(20).transform(v => clamp(v, 0, 100)) }).prefault({}),
    魅力: z.object({ 数值: z.coerce.number().prefault(18).transform(v => clamp(v, 0, 100)) }).prefault({}),
    权势: z.object({ 数值: z.coerce.number().prefault(12).transform(v => clamp(v, 0, 100)) }).prefault({}),
    洞察: z.object({ 数值: z.coerce.number().prefault(16).transform(v => clamp(v, 0, 100)) }).prefault({}),
  }).prefault({}),

  女主关系: z.record(z.string().describe('女主姓名'), z.object({
    身份: z.string().prefault('未知'),
    关系阶段: z.string().prefault('初识'),
    好感: z.coerce.number().prefault(0).transform(v => clamp(v, -100, 100)),
    信任: z.coerce.number().prefault(0).transform(v => clamp(v, -100, 100)),
    警惕: z.coerce.number().prefault(20).transform(v => clamp(v, -100, 100)),
    当前态度: z.string().prefault('观察'),
    最近互动: z.array(z.string()).prefault([]).transform(v => _.takeRight(v, 5)),
    专属事件进度: z.coerce.number().prefault(0).transform(v => clamp(v, 0, 100)),
  })).prefault({
    沈清璃: { 身份: '投行合伙人', 关系阶段: '审视中的商业对象', 好感: 0, 信任: 0, 警惕: 35, 当前态度: '冷静评估你的履约能力', 最近互动: [], 专属事件进度: 0 },
    顾晚音: { 身份: '豪门继承人', 关系阶段: '传闻中的竞争者', 好感: 0, 信任: -5, 警惕: 45, 当前态度: '以旧钱阶层的标准观察你', 最近互动: [], 专属事件进度: 0 },
    林知夏: { 身份: '私人生活助理候选人', 关系阶段: '等待面试', 好感: 5, 信任: 5, 警惕: 15, 当前态度: '谨慎期待一份被尊重的机会', 最近互动: [], 专属事件进度: 0 },
    苏曼青: { 身份: '顶流演员', 关系阶段: '镜头之外的陌生人', 好感: 0, 信任: 0, 警惕: 30, 当前态度: '警惕资本靠近她的真实生活', 最近互动: [], 专属事件进度: 0 },
    许明月: { 身份: '精英律师', 关系阶段: '专业距离', 好感: 0, 信任: 0, 警惕: 30, 当前态度: '只相信证据、合同和可验证承诺', 最近互动: [], 专属事件进度: 0 },
  }),

  商业势力: z.record(z.string().describe('势力名称'), z.object({
    类型: z.string().prefault('商业组织'),
    态度: z.string().prefault('观望'),
    影响力: z.coerce.number().prefault(0).transform(v => clamp(v, 0, 100)),
    风险: z.coerce.number().prefault(0).transform(v => clamp(v, 0, 100)),
  })).prefault({}),

  世界信息: z.object({
    当前地点: z.string().prefault('云海市CBD'),
    当前日期: z.string().prefault('2026-05-16'),
    当前时间: z.string().prefault('20:00'),
    天气: z.string().prefault('微雨'),
    当前主线: z.string().prefault('黑金名利场开局'),
    限时事件: z.array(z.string()).prefault([]).transform(v => _.takeRight(v, 5)),
  }).prefault({}),

  事件日志: z.array(z.union([
    z.string(),
    z.object({
      时间: z.string().prefault(''),
      内容: z.string().prefault(''),
      影响: z.string().prefault(''),
    }),
  ])).prefault([]).transform(v => _.takeRight(v, 8)),
});

(() => {
  registerMvuSchema(schema);
})();
