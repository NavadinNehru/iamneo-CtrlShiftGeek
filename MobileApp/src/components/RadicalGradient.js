import { memo } from "react";
import Svg, {RadialGradient, Circle, Defs ,Stop} from "react-native-svg";

export default memo(function RadicalGradient({length=850, colorCenter = '#FDE85C' , colorOuter = '#FFFFFF' , ...props}) {
    return (
        <Svg
            height={length}
            width={length}
            viewBox= {`0 0 ${length} ${length}`}
            {...props}
        >
            <Defs>
                <RadialGradient id="grad">
                    <Stop offset={0} stopColor={colorCenter} stopOpacity="1" />
                    <Stop offset={100} stopColor={colorOuter} stopOpacity="1" />
                </RadialGradient>
            </Defs>
            <Circle cx={length/2} cy={length/2} r={length/2} fill="url(#grad)" />
        </Svg>
    )

})