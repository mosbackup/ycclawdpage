---
title: "YC Spring 2026 Batch: How the Startup Leaderboard Was Obtained by Averaging 10 Different LLMs"
description: "A look at the experimental P26 leaderboard methodology, its limitations, and what comes next."
date: "2026-04-29"
author: "YC Bench Team"
---

At YC Bench, our goal is to forecast YC startup outperformance as early as possible. For the Spring 2026 (P26) batch, a new, experimental proof of concept was tested: asking Large Language Models to step into the shoes of an investor in YC startups, and rank the batch.

The resulting **P26 Startup Leaderboard** is:

![](https://ycbench.com/yc_p26_startups_leaderboard.jpg)

This post presents how this list was obtained, the quirks of relying on LLMs for venture screening, and why this is just the first step.

---

## The Methodology: Averaging Out LLM Stochastic Outputs

The core prompt we used (which you can find in [`prompt.txt` on GitHub](https://github.com/benstaf/ycbench/tree/main/spring_2026_batch/LLMs/prompt.txt)) is simple:

> *I am an accredited investor, and I want to invest in the top 20 startups of the Y Combinator current batch (P26), can you make a recommendation of the top 20 startups? Only reply with the list of the names of the 20 selected startups.*

However, along with this request, it was also necessary to pass a JSON payload containing the basic data for the entire publicly known P26 batch of +100 startups. Otherwise, no LLMs would output 20 YC P26 startups.

LLMs are also inherently stochastic. Ask any model to pick the top 20 startups five different times, and you will get five different lists.

To average out this variation, we implemented two layers of aggregation:

* **Model-Level Averaging:** we ran the exact same prompt with JSON payload **5 separate times** for each individual LLM tested, and calculated the average ranking of each YC P26 startup.
* **Cross-Model Averaging:** we aggregated the lists from **10 different LLMs** (4 from the United States, 6 from China). The final leaderboard is the average across all models and all iterations.

---

## Observations: Superficial Screening & The JSON Trap

While this approach stabilized the outputs, this initial run remains a small proof of concept.

The most glaring limitation we observed was the **shallowness of the LLMs' reasoning**.

Because the models were constrained to a single-shot prompt, they often relied entirely on the provided JSON data. They acted more like shallow pattern-matchers — gravitating toward buzzwords, familiar business models, or well-structured descriptions — rather than careful investors doing due diligence.

Models seldom attempted to "think outside the prompt" and to explore beyond the immediate text provided to them, even though they accessed their agentic search function, and could theoretically browse the websites of the +100 YC P26 startups.

---

## What's Next: Deep Research

This proof of concept highlights exactly where improvements are needed: moving from **static JSON payloads to agentic workflows**.

We want the models to actually do their homework — browse the web, analyze startup landing pages, check founder backgrounds, generate and compare market reports — before making any final investment recommendation.

This P26 Leaderboard provides a baseline for AI agents, but the real unlock will come when models use tools to dig deeper.

---

Want to see the raw data? Check out the [`spring_2026_batch/LLMs` directory in the YC Bench GitHub repo](https://github.com/benstaf/ycbench/tree/main/spring_2026_batch/LLMs).
