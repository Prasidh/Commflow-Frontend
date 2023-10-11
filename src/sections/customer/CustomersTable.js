import PropTypes from 'prop-types';
import {format} from 'date-fns';
import {
    Box,
    Card,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';
import {Scrollbar} from 'src/components/Scrollbar';
import Link from "next/link";
import axios from "axios";
import {APIs} from "../../const/Api";
import {useRouter} from "next/router";

export const CustomersTable = (props) => {
    const {
        count = 0,
        items = [],
        onDeselectAll,
        onDeselectOne,
        onPageChange = () => {
        },
        onRowsPerPageChange,
        onSelectAll,
        onSelectOne,
        page = 0,
        rowsPerPage = 0,
        selected = []
    } = props;

    const router=useRouter();
    const selectedSome = (selected.length > 0) && (selected.length < items.length);
    const selectedAll = (items.length > 0) && (selected.length === items.length);
    return (
        <Card style={{"box-shadow": "rgba(50, 50, 93, 0.25) 0px 4px 8px -2px, rgba(0, 0, 0, 0.3) 0px 2px 5px -2px"}}>
            <Scrollbar>
                <Box sx={{minWidth: 800}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedAll}
                                        indeterminate={selectedSome}
                                        onChange={(event) => {
                                            if (event.target.checked) {
                                                onSelectAll?.();
                                            } else {
                                                onDeselectAll?.();
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    Select All
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((customer) => {
                                const isSelected = selected.includes(customer.id);
                                const createdAt = new Date(customer.createdAt);
                                const formattedDate = !isNaN(createdAt)
                                    ? format(createdAt, 'dd/MM/yyyy')
                                    : 'Invalid Date';

                                return (
                                    <TableRow

                                        hover
                                        key={customer.id}
                                        selected={isSelected}
                                    >
                                        <TableCell width="5%" padding="checkbox">
                                            <Checkbox
                                                checked={isSelected}
                                                onChange={(event) => {
                                                    if (event.target.checked) {
                                                        onSelectOne?.(customer.id);
                                                    } else {
                                                        onDeselectOne?.(customer.id);
                                                    }
                                                }}
                                            />
                                        </TableCell>
                                        <Link href={`/emails/${customer.id}`} >
                                            <div className={"mt-3 flex justify-evenly cursor-pointer"}>
                                                <TableCell width="20%" style={{"overflow": "hidden"}}>
                                                    {customer.sender}
                                                </TableCell >
                                                <TableCell width="60%">
                                                    {customer.subject}
                                                </TableCell>
                                                <TableCell width="15%">
                                                    {customer.timestamp}
                                                </TableCell>
                                        </div>
                                        </Link>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Box>
            </Scrollbar>
            <TablePagination
                component="div"
                count={count}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[25, 40, 50]}
            />
        </Card>
    );
}
    ;

    CustomersTable.propTypes = {
        count: PropTypes.number,
        items: PropTypes.array,
        onDeselectAll: PropTypes.func,
        onDeselectOne: PropTypes.func,
        onPageChange: PropTypes.func,
        onRowsPerPageChange: PropTypes.func,
        onSelectAll: PropTypes.func,
        onSelectOne: PropTypes.func,
        page: PropTypes.number,
        rowsPerPage: PropTypes.number,
        selected: PropTypes.array
    };
