import { Pie } from "react-chartjs-2";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { CalonKetua } from "@/models/CalonKetua";
ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartPemilihanProps {
  dataCalon: CalonKetua[];
  width?: string;
}

const PieChartPemilihan = ({
  dataCalon,
  width = "50%",
}: PieChartPemilihanProps) => {
  const colors: string[] = ["#71CFB9", "#FAC441", "#556080", "#f6f6f6"];

  const pieData = {
    labels: dataCalon.map((calon) => calon.warga.namaLengkap),
    datasets: [
      {
        label: "Total Pemilih",
        data: dataCalon.map((calon) => calon._count.vote),
        backgroundColor: colors,
      },
    ],
  };

  return (
    <div style={{ width, margin: "0 auto" }}>
      <Pie
        data={pieData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Chart.js Pie Chart",
            },
          },
        }}
      />
    </div>
  );
};

export default PieChartPemilihan;
