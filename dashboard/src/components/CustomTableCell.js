import withStyles from '@material-ui/core/styles/withStyles'
import {PRIMARY, SECONDARY} from '../constants/Colors'
import TableCell from '@material-ui/core/TableCell'

const CustomTableCell = withStyles(theme =>({
    head:{
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
    }
  }))(TableCell)

  export default CustomTableCell