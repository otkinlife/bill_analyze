function zzt(){
    // 指定图表的配置项和数据
    let title;
    if (selectMonth === '') {
        title = selectYear + '年' + '消费分布'
    } else {
        title = selectYear + '年' + selectMonth + '月' + '消费分布'
    }
    const ZztOption = {
        title: {
            text: title
        },
        tooltip: {},
        xAxis: {
            data: []
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                type: 'bar',
                data: []
            }
        ]
    };
// 使用刚指定的配置项和数据显示图表。
    const yZztChart = echarts.init(document.getElementById('zzt'));

    yZztChart.setOption(ZztOption);

    const types = [];
    const amounts = [];

    $.each(BillObj, function (k, v) {
        types.push(k)
        amounts.push(v / 100)
    })
    yZztChart.setOption({
        xAxis: {
            data: types
        },
        series: [
            {
                name: '数额（元）',
                data: amounts,
                itemStyle: {
                    normal: {
                        label: {
                            show: true, //开启显示数值
                            position: 'top', //数值在上方显示
                            textStyle: {  //数值样式
                                color: '#000000',   //字体颜色
                                fontSize: 14  //字体大小
                            }
                        }
                    }
                }
            }
        ]
    })
}
