import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
        "& .MuiTableCell-root": {
            borderLeft: "1px solid rgba(224, 224, 224, 1)",
            borderRight: "1px solid rgba(224, 224, 224, 1)",
            borderTop: "1px solid rgba(224, 224, 224, 1)"
        }
    }
});

function createData(name, calories, fat, carbs, protein, food) {
    return { name, calories, fat, carbs, protein, food };
}

export default function App({ cols, data, add }) {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {
                            cols.map((headerItem, index) => (
                                <TableCell
                                    colSpan={headerItem.colSpan}
                                    key={index}
                                    align={headerItem.headerAlign}
                                    style={{
                                        height: 36,
                                        fontWeight: 900,
                                    }}
                                >
                                    {headerItem.title}
                                </TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((row, i) => {
                        return (
                            <TableRow>
                                {cols.map((col, key) => (
                                    <TableCell
                                        align={col.align}
                                        key={key}
                                        style={{
                                            fontWeight: 400,
                                        }}
                                    >
                                        {col.render(row, i)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        )
                    })}
                    <TableRow>
                        <TableCell align="center" style={{ textAlign: 'left' }} colSpan={8}>
                            <Button onClick={add}>ADD
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
