import React from 'react'
import {Paper,Table,TableBody,TableCell,TableHead,TableRow} from '@material-ui/core/'
import { format } from 'date-fns'
import CustomTableCell from './CustomTableCell'


const CustomTable = ({attributes,headers,data,funcConfig})=> 
( <Paper>
        <Table>
        <TableHead>
            <TableRow>
            {headers.map(attribute => <CustomTableCell>{attribute}</CustomTableCell>)}
            </TableRow>
        </TableHead>
        <TableBody>
            {data.map(row =>
            <TableRow
                key={row.id}
                hover
                onClick={() => (funcConfig.sendState)?
                    funcConfig.history.push({
                    pathname:`/${funcConfig.path}/${row.id}`,
                    state: {data: row}}):
                    funcConfig.history.push({
                        pathname:`/${funcConfig.path}/${row.id}`})}
                style={{ cursor: 'pointer' }}>
                {attributes.map(attribute => (attribute=='timestamp')?
                <TableCell>{format(new Date(row[attribute]), 'YYYY-MM-DDTHH:mm:ssZ')}</TableCell>: <TableCell>{row[attribute]}</TableCell>)}
           
            </TableRow>
            )}
        </TableBody>
        </Table>
        </Paper>)

 export default CustomTable
//  {(attribute) => { (attribute =='timestamp')?                
//  <TableCell>{ format(new Date(row[attribute]), 'YYYY-MM-DDTHH:mm:ssZ')}
//  </TableCell>:<TableCell>{row[attribute]}</TableCell>})

 {/* <TableBody>
              {this.state.racks.map(rack =>
                <TableRow
                  key={rack.id}
                  hover
                  onClick={() => history.push({
                    pathname:`/racks/${rack.id}`,
                    state: {rack: rack}})}
                  style={{ cursor: 'pointer' }}
                >
                {[
                    format(new Date(rack.timestamp), 'YYYY-MM-DDTHH:mm:ssZ'),
                    rack.timestamp
                    ].map(cell=><TableCell>{cell}</TableCell>)}
                </TableRow>
              )} */}
            // </TableBody>
        // [rack.id,
        //     rack.growing,
        //     rack.temp_air,
        //     rack.temp_water,
        //     rack.co2,
        //     rack.ph,
        //     rack.ec,
        //     rack.humidity,
        //     rack.light,
        //     format(new Date(rack.timestamp), 'YYYY-MM-DDTHH:mm:ssZ')
        //     ]
{/* <CustomTableCell>Id</CustomTableCell>
<CustomTableCell>Growing</CustomTableCell>
<CustomTableCell>Air temp</CustomTableCell>
<CustomTableCell>Water temp</CustomTableCell>
<CustomTableCell>CO2</CustomTableCell>
<CustomTableCell>Ph</CustomTableCell>
<CustomTableCell>EC</CustomTableCell>
<CustomTableCell>Humidity</CustomTableCell>
<CustomTableCell>Light</CustomTableCell>
<CustomTableCell>Last update</CustomTableCell> */}