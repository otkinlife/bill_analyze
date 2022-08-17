function bzt() {
    let title;
    if (selectMonth === '') {
        title = selectYear + '年' + '消费比例'
    } else {
        title = selectYear + '年' + selectMonth + '月' + '消费比例'
    }
    const BztOption = {
        title: {
            text: title
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '40',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    const yBztChart = echarts.init(document.getElementById('bzt'));
    yBztChart.setOption(BztOption);
    let bztList = []
    $.each(BillObj, function (k, v){
        bztList.push({value: v / 100, name:k})
    })
    yBztChart.setOption({series:[{data:bztList}]})
}
