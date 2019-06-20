import withStyles from '@material-ui/core/styles/withStyles'

import TableCell from '@material-ui/core/TableCell'

const CustomTableCell = withStyles(theme =>({
    head:{
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
    }
  }))(TableCell)

  export default CustomTableCell