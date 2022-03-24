import { FC, memo, useMemo } from 'react'
import * as echarts from 'echarts/core'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components'
import { PieChart, PieSeriesOption } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import ReactEChartsCore from 'echarts-for-react/lib/core'

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
])

interface AboutPieChartProps {
  data: {
    value: number
    name: string
  }[]
}

const GroupPieChart: FC<AboutPieChartProps> = ({ data }) => {
  const pieOptions = useMemo<PieSeriesOption>(() => {
    return {
      title: {
        text: '文章分布',
        subtext: '分组数据',
        left: 'left',
      },
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          type: 'pie',
          radius: '60%',
          data,
          label: {
            formatter: '{b}-{d}%',
          },
          labelLine: {
            length: 5,
            length2: 5,
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    }
  }, [data])

  return (
    <ReactEChartsCore
      option={pieOptions}
      style={{ width: '100%', height: 380 }}
      echarts={echarts}
      opts={{
        devicePixelRatio: 2,
      }}
    />
  )
}

export default memo(GroupPieChart)
