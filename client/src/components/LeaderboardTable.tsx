import { LEADERBOARD_DATA } from "@/pages/leaderboardData";
const YC_LOGO =
  "https://i0.wp.com/www.vccafe.com/wp-content/uploads/2017/09/Y_Combinator_logo_text_wordmark.png";

const MODEL_META: Record<string, { icon: string; label: string }> = {
  Claude: {
    icon: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Claude_AI_symbol.svg",
    label: "Sonnet 4.6",
  },
  GPT: {
    icon: "https://upload.wikimedia.org/wikipedia/commons/e/ef/ChatGPT-Logo.svg",
    label: "5.3",
  },
  Gemini: {
    icon: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Google-gemini-icon.svg",
    label: "3.1 Pro",
  },
  Grok: {
    icon: "https://www.nan.xyz/wp-content/uploads/grok-seeklogo-.svg",
    label: "4.20",
  },
  GLM: {
    icon: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Z.ai_%28company_logo%29.svg",
    label: "5.1",
  },
  Kimi: {
    icon: "https://apktodo.io/uploads/2025/12/kimi-icon-150.jpg",
    label: "2.6",
  },
  DeepSeek: {
    icon: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/deepseek-color.png",
    label: "V4",
  },
  Qwen: {
    icon: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/qwen-color.png",
    label: "3.6 Plus",
  },
  MiniMax: {
    icon: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/minimax-color.png",
    label: "M-2.7",
  },
  Mimo: {
    icon: "https://upload.wikimedia.org/wikipedia/commons/2/29/Xiaomi_logo.svg",
    label: "v2.5 Pro",
  },
};

const MODELS = [
  "Claude",
  "GPT",
  "Gemini",
  "Grok",
  "GLM",
  "Kimi",
  "DeepSeek",
  "Qwen",
  "MiniMax",
  "Mimo",
] as const;

export function LeaderboardTable() {
  return (
    <div className="overflow-x-auto rounded-xl border border-border shadow-md">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-secondary/70 border-b border-border">
            {/* Rank */}
            <th className="sticky left-0 bg-secondary/70 z-10 py-4 px-3 text-left font-semibold w-8">
              #
            </th>

            {/* Startup name */}
            <th className="sticky left-8 bg-secondary/70 z-10 py-3 px-4 text-left font-semibold min-w-[150px] border-r border-border">
              <div className="flex flex-col items-start gap-1">
                <img
                  src={YC_LOGO}
                  alt="Y Combinator"
                  className="h-7 w-auto object-contain"
                />
                <span className="text-sm font-semibold text-foreground">
                  Startup (P26)
                </span>
              </div>
            </th>

            {/* Average score */}
            <th className="py-4 px-4 text-center font-semibold text-primary whitespace-nowrap border-r border-border">
              Average
            </th>

            {/* Per-model columns */}
            {MODELS.map((m) => {
              const meta = MODEL_META[m];
              return (
                <th
                  key={m}
                  className="py-3 px-3 text-center font-semibold whitespace-nowrap"
                >
                  <div className="flex flex-col items-center gap-1">
                    <img src={meta.icon} alt={m} className="w-5 h-5" />
                    <span className="text-[11px] font-medium text-foreground">
                      {m}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {meta.label}
                    </span>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {LEADERBOARD_DATA.map((row, i) => (
            <tr
              key={row.name as string}
              className={`border-b border-border/50 hover:bg-secondary/20 transition-colors ${
                i % 2 === 0 ? "bg-card" : "bg-secondary/10"
              }`}
            >
              {/* Rank */}
              <td className="sticky left-0 py-3 px-3 font-mono text-xs text-muted-foreground bg-inherit z-10">
                {i + 1}
              </td>

              {/* Startup name */}
              <td className="sticky left-8 py-3 px-4 font-medium bg-inherit z-10 border-r border-border whitespace-nowrap">
                {row.name as string}
              </td>

              {/* Average */}
              <td className="py-3 px-4 text-center font-mono font-bold text-primary border-r border-border">
                {row["LLM Average"] as number}
              </td>

              {/* Per-model scores */}
              {MODELS.map((m) => {
                const v = (row[m] as number) ?? 0;
                const cls =
                  v === 0
                    ? "text-muted-foreground/30"
                    : v >= 80
                    ? "text-green-700 dark:text-green-400 font-semibold"
                    : v >= 40
                    ? "text-foreground"
                    : "text-muted-foreground";
                return (
                  <td
                    key={m}
                    className={`py-3 px-3 text-center font-mono text-xs ${cls}`}
                  >
                    {v > 0 ? v : "—"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
