import { Card, CardBody, CardHeader, CardFooter } from '@paljs/ui/Card';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import React from 'react'

import cx from './barang_list.module.css'

import Layout from 'Layouts';
import ListIcon from '@material-ui/icons/List';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import LinearProgress from '@material-ui/core/LinearProgress';

const columns = [
  
  { id: 'id', label: 'Id', minWidth: 170 },
  { id: 'name', label: 'Name', align: 'center',minWidth: 170 },
  { id: 'published_at', align: 'right',label: 'Published At', minWidth: 170 },
];

export default function Barang_list() {
	
  
  const [rows, setrows] = React.useState([]);
  
  const [ShowHideLin, setShowHideLin] = React.useState({display:"block"});

  React.useEffect(() => {
		
	loadData();
	  

  }, []);		
  const loadData = async(e) => {

    await DoShowLin()

	  await fetch("https://private-216af8-products191.apiary-mock.com/product", {
      method: "GET",
     		}).then(res => res.json())
			  .then(
				(result) => {
          let data = result;
          console.log(result)
          if(result){
            setrows(result);
          }
      });
      
      await DoHideLin()
	 
  }

  const DoShowLin = async(e) => {
    setShowHideLin({display:"block"})
  }

  const DoHideLin = async(e) => {
    setShowHideLin({display:"none"})
  }
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Layout title="List Barang">
      <Row>
        <Col breakPoint={{ xs: 24, md: 12 }}>
          <Card status="Primary" accent="Info">
            <CardHeader><ListIcon style={{marginBottom:-7}} color="primary"/> DATA BARANG </CardHeader>
            <CardBody>
   			<Paper className={cx.root}>
      <TableContainer >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >

                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    //console.log(column.id);
					
						const value = row[column.id];
						return (
						  <TableCell key={column.id} align={column.align}>
							{column.format && typeof value === 'number' ? column.format(value) : value}
						  </TableCell>
						  
						);
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
			</CardBody>
             <CardFooter><LinearProgress style={ShowHideLin}/></CardFooter>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}
