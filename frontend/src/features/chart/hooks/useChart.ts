import { useState, useEffect, useRef } from "react"
import { IPlan, IPoint } from "../../../types"
import { ascendingDates } from "../../../utils/ascendingDates"
import { formatPoint } from "../../../utils/formatPoint"

const useChart = (currentPlan: IPlan | null) => {

    const [points, setPoints] = useState<IPoint[] | []>([])

    useEffect(() => {
        if (currentPlan?.tracker.points) {
        return setPoints([...currentPlan.tracker.points])
        }
        setPoints([])
    }, [currentPlan])

    const options = {
        chart: {
          type: 'spline',
          backgroundColor: '#31393D',
          style: {
            color: 'white'
          }, 
        },
        title: {
          text: ''
        },
        accessibility: {
          enabled: false
        },
        xAxis: {
            type: 'datetime',
            scrollbars: {
              enabled: true
            },
            dateTimeLabelFormats: {
                month: '%e. %b',
            },
            title: {
                text: 'Date',
                style: {
                  color: 'white'
                }
            },
            labels: {
              style: {
                color: 'white'
              }
            }
        },
        yAxis: {
            title: {
                text: `${currentPlan?.tracker.yAxis || ''}`,
                style: {
                  color: 'white'
                }
            },
            labels: {
              style: {
                color: 'white'
              }
            },
            min: 0
        },
        tooltip: {
            headerFormat: '',
            pointFormat: `{point.x:%e. %b}: {point.y} ${currentPlan?.tracker.yAxis}`
        },
        colors: ['#60EFD5'],
        series: [
          {
            showInLegend: false,
            data: ascendingDates(points.map((point: IPoint) => formatPoint(point)))
          }
        ]
      };

      const chartRef = useRef<any>(null);

      const handleResize = () => {
        if (chartRef.current && chartRef.current.chart) {
          const chart = chartRef.current.chart;
          chart.setSize(window.innerWidth, 400, false);
        }
      };

      useEffect(() => {
      
        window.addEventListener("resize", handleResize);
    
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, [chartRef]);

  return {
    points,
    setPoints,
    options,
    chartRef
  }
}

export default useChart