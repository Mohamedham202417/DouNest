import { getLang } from "./i18n.js";

const ARTICLES = [
  {
    slug: "json-guide",
    title: {
      ar: "دليل شامل لـ JSON: من الصفر إلى الاحتراف",
      en: "Complete JSON Guide: From Zero to Hero"
    },
    excerpt: {
      ar: "كل ما تحتاج معرفته عن JSON: البنية، الأخطاء الشائعة، والاستخدامات.",
      en: "Everything you need to know about JSON: structure, common errors, and uses."
    },
    date: "2026-10-12",
    tags: ["json", "developer"],
    content: {
      ar: `## ما هو JSON؟
JSON (JavaScript Object Notation) هو تنسيق نصي لتبادل البيانات...

## البنية الأساسية
...

## الأخطاء الشائعة
...

## متى تستخدم JSON؟
...`,
      en: `## What is JSON?
JSON (JavaScript Object Notation) is a text format for data exchange...

## Basic Structure
...

## Common Errors
...

## When to Use JSON?
...`
    }
  },
  {
    slug: "pdf-conversion-guide",
    title: {
      ar: "كيفية تحويل PDF إلى Word و Excel: دليل عملي",
      en: "How to Convert PDF to Word and Excel: A Practical Guide"
    },
    excerpt: {
      ar: "طرق مختلفة لتحويل ملفات PDF مع الحفاظ على التنسيق.",
      en: "Different methods to convert PDF files while preserving formatting."
    },
    date: "2026-10-12",
    tags: ["pdf", "conversion"],
    content: {
      ar: `## مقدمة
تحويل PDF إلى صيغ قابلة للتحرير هو حاجة يومية...

## الطريقة الأولى: استخدام DouNest
...

## الطريقة الثانية: الأدوات المكتبية
...

## نصائح للحفاظ على التنسيق
...`,
      en: `## Introduction
Converting PDF to editable formats is a daily need...

## Method 1: Using DouNest
...

## Method 2: Desktop Tools
...

## Tips to Preserve Formatting
...`
    }
  },
  {
    slug: "ai-tools-guide",
    title: {
      ar: "أفضل 20 أداة ذكاء اصطناعي في 2026",
      en: "Top 20 AI Tools in 2026"
    },
    excerpt: {
      ar: "قائمة محدثة بأقوى أدوات AI للمطورين والمصممين والكتّاب.",
      en: "An updated list of the most powerful AI tools for developers, designers, and writers."
    },
    date: "2026-10-12",
    tags: ["ai", "tools"],
    content: {
      ar: `## مقدمة
شهد عام 2026 انفجارًا في أدوات الذكاء الاصطناعي...

## للمطورين
...

## للمصممين
...

## للكتّاب
...`,
      en: `## Introduction
2026 saw an explosion in AI tools...

## For Developers
...

## For Designers
...

## For Writers
...`
    }
  }
];

export function getArticles() { return ARTICLES; }
export function getArticle(slug) { return ARTICLES.find(a => a.slug === slug); }
