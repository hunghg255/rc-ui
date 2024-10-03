import type { TooltipRef } from 'rc-Tooltip'
import RcTooltip from 'rc-tooltip'

import './styles.css'

interface TooltipProps extends React.ForwardRefExoticComponent<TooltipProps & React.RefAttributes<TooltipRef>> {}

function Tooltip(props: TooltipProps) {
  return (
    // @ts-expect-error
    <RcTooltip
      {...props}
    />
  )
}

export {
  Tooltip,
}
export default Tooltip
