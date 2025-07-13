import { Typography } from "@mui/material";

export default function ScoreBoard({ score, best }) {
  return (
    <div className="text-center">
      <Typography variant="h6" sx={{ color: "#ffffff" }}>
        Score: {score}
      </Typography>
      <Typography variant="subtitle2" sx={{ color: "#bbbbbb" }}>
        Best: {best}
      </Typography>
    </div>
  );
}
