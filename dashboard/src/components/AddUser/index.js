import React from 'react'
import { connect } from 'react-redux'
import { addUser } from '../../Redux/actions'
import {Paper, Typography} from '@material-ui/core/'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: '16px 40px',
  },
  logo: {
    backgroundImage: `url(${require('../../assets/images/logo.png')})`,
    backgroundRepeat: 'no-repeat',
    height: 200,
    width: 300,
    backgroundSize: 'contain',
    margin: 40,
  },
})

const mapStateToProps = state => {
  return { users: state.users };
};

//const ConnectedAddUser = ({classes,dispatch})=>{
  
 const AddUser =({classes,users,dispatch}) =>{ 
  console.log("eeyooo")
  console.log(users)
return (
  <div className={classes.root}>
  {/* <Card className={classes.card}> */}
  <div className={classes.logo}></div>
  {/* </Card> */}
  </div>
)

}
// let AddUser = ({ dispatch }) => {
//     let input
  
//     return (
//       <Paper>
//         <form
//           onSubmit={e => {
//             e.preventDefault()
//             if (!input.value.trim()) {
//               return
//             }
//             dispatch(addUser(input.value))
//             input.value = ''
//           }}
//         >
//           <input
//             ref={node => {
//               input = node
//             }}
//           />
//           <button type="submit">Add User</button>
//         </form>
//       </Paper>
//     )
//   }
//   AddUser = connect()(AddUser)
  
//  export default  connect(mapStateToProps)(withStyles(styles)(AddUser))

//const  AddUser = connect(mapStateToProps)(ConnectedAddUser)

export default connect(mapStateToProps)(withStyles(styles)(AddUser));
  //export default withStyles(styles)(AddUser);