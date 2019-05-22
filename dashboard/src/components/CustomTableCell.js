import withStyles from '@material-ui/core/styles/withStyles'
import {PRIMARY, SECONDARY} from '../constants/Colors'
import TableCell from '@material-ui/core/TableCell'
import { format } from 'date-fns'

const CustomTableCell = withStyles(theme =>({
    head:{
      backgroundColor: PRIMARY,
      color: SECONDARY,
    }
  }))(TableCell)

  export default CustomTableCell