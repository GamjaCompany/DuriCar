import { ResponsivePie } from '@nivo/pie'

function PieChart({ data }) {
    console.log(data)
    return (
        <div className='chart'>
            <ResponsivePie
                data={data}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                sortByValue={true}
                innerRadius={0.7}
                padAngle={1}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                colors={{ scheme: 'category10' }}
                borderWidth={1}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            0.2
                        ]
                    ]
                }}
                enableArcLinkLabels={false}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                enableArcLabels={false}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            2
                        ]
                    ]
                }}
                legends={[]}
            />
        </div>
    )
}

export default PieChart;