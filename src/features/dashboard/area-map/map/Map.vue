<template>
    <div class="map">
      <div class="map__container">
        <div ref="chartRef" class="map__chart"></div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import * as echarts from 'echarts/core'
  import {
    TooltipComponent,
    TooltipComponentOption,
    GeoComponent,
    GeoComponentOption
  } from 'echarts/components'
  import { ScatterChart, ScatterSeriesOption } from 'echarts/charts'
  import { CanvasRenderer } from 'echarts/renderers'
  import axios from 'axios'
  
  echarts.use([TooltipComponent, GeoComponent, ScatterChart, CanvasRenderer])
  
  type EChartsOption = echarts.ComposeOption<
    TooltipComponentOption | GeoComponentOption | ScatterSeriesOption
  >
  
  const chartRef = ref<HTMLDivElement | null>(null)
  let chart: echarts.ECharts
  
  const locations = ref([
    { name: 'Canada', value: [-106.0, 56.0], selected: false },
    { name: 'Palestina', value: [35.0, 32.0], selected: true },
    { name: 'Groenlandia', value: [-42.0, 61.0], selected: false },
    { name: 'Rusia', value: [105.0, 61.5], selected: true }
  ])
  
  const buildSeriesData = () => {
    return locations.value.map((loc) => ({
      name: loc.name,
      value: loc.value,
      itemStyle: {
        color: loc.selected ? 'gray' : 'green',
        borderColor: '#fff',
        borderWidth: 1
      }
    }))
  }
  
  const initChart = () => {
    const option: EChartsOption = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}'
      },
      geo: {
        map: 'world',
        roam: true,
        itemStyle: {
          areaColor: '#f5f5f5',
          borderColor: '#ddd'
        }
      },
      series: [
        {
          id: 'points',
          name: 'Ubicaciones',
          type: 'scatter',
          coordinateSystem: 'geo',
          symbolSize: 12,
          label: {
            show: true,
            formatter: '{b}',
            position: 'right',
            distance: 5,
            fontSize: 12,
            color: '#333'
          },
          data: buildSeriesData()
        }
      ]
    }
  
    chart.setOption(option)
  }
  
  const attachClickHandler = () => {
    chart.on('click', (params: any) => {
      if (params.seriesId === 'points') {
        const idx = params.dataIndex as number
        locations.value[idx].selected = !locations.value[idx].selected
        chart.setOption({
          series: [
            {
              id: 'points',
              data: buildSeriesData()
            }
          ]
        })
      }
    })
  }
  
  onMounted(async () => {
    if (!chartRef.value) return
    chart = echarts.init(chartRef.value)
    chart.showLoading()
  
    const { data: worldJson } = await axios.get('/assets/map/world.json')
    echarts.registerMap('world', worldJson)
  
    initChart()
    attachClickHandler()
    chart.hideLoading()
  })
  </script>
  
  <style src="./Map.scss" scoped></style>
  