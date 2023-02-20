import { useEffect, useState } from "react";
//import component
import Table from "../Component/Table/index";

//import 
import { Button, TextField } from "@material-ui/core";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


//import handler service
import api, { doPromiseResolve, doPromiseReject } from "../HandlerService/List.service";
import apiAdd, { doPromiseResolveAdd, doPromiseRejectAdd } from "../HandlerService/AddList.service";

//component
import ModalInfo from '../Component/Popups/PopupsInfo'
import Menus from "../Component/Menus";

const FromInput = () => {
    const [dataTables, setDataTable] = useState([]);
    const [loading, setLoading] = useState(false);
    const [infotext, setInfoText] = useState("");
    const [isinfo, setInfoOpen] = useState(false);
    const [discount, setdiscount] = useState("");
    const [mode, setMode] = useState("");
    const [tgl, setTgl] = useState();
    const [total, setTotal] = useState("");
    const [totalHarga, setTotalHarga] = useState("");
    const [kode, setKode] = useState("");
    const [kodeSuplier, setKodeSuplier] = useState("");
    const [deleteModal, setDeleteModal] = useState(false);


    //Config Table
    const tableConfig = [
        {
            title: "No",
            headerAlign: 'center',
            align: 'center',
            render: (rowData, index) => {
                return <span> {index + 1}</span>
            }
        },
        {
            title: "Kode",
            headerAlign: 'center',
            align: 'center',
            render: rowData => {
                return <span> {rowData.kt_trans || '-'}</span>
            }
        },
        {
            title: "Nama Barang",
            headerAlign: 'center',
            align: 'center',
            render: rowData => {
                return <span> {'-' || '-'}</span>
            }
        },
        {
            title: "Qty",
            headerAlign: 'center',
            align: 'center',
            render: rowData => {
                return <span> {rowData.total_item || '-'}</span>
            }
        },
        {
            title: "Harga",
            headerAlign: 'center',
            align: 'center',
            render: rowData => {
                return <span> {rowData.total_harga || '-'}</span>
            }
        },
        {
            title: "Disc",
            headerAlign: 'center',
            align: 'center',
            render: rowData => {
                return <span> {rowData.total_harga || '-'}</span>
            }
        },
        {
            title: "Update Data",
            colSpan: 3,
            headerAlign: 'center',
            align: 'center',
            render: rowData => {
                return <span>{<Menus data={rowData} onEdit={data => handleEditList(data)} onDelete={data => handelDeleteList(data)} />}</span>
            }
        },

    ]

    const Cancel = () => {
        setMode("")
        setTgl("")
        setKodeSuplier("")
        setTotal("")
        setTotalHarga("")
        setdiscount("")
    }

    const handleEditList = rowData => {
        setMode("Edit")
        setKode(rowData.kt_trans)
        setTgl(rowData.tgl_trans)
        setKodeSuplier(rowData.kd_sup)
        setTotal(rowData.total_item)
        setTotalHarga(rowData.total_harga)
        setdiscount(rowData.discount)
    }
    const handelDeleteList = (rowData) => {
        setDataTable((data) => data.filter((chip) => chip.id !== rowData.id));

    }

    useEffect(() => {
        api.List()
            .then(res => doPromiseResolve(res, { setDataTable }))
            .catch(err => doPromiseReject(err, { setInfoText, setInfoOpen }))
    }, [])

    // Gunakan fungsi untuk membuat kode transaksi
    useEffect(() => {
        setKode(createTransactionCode())
    }, [])

    // Fungsi untuk membuat kode transaksi
    function createTransactionCode() {
        // Ambil tanggal saat ini
        const now = new Date();

        // Dapatkan time saat ini
        const time = String(now.getTime());

        // Gabungkan tanggal dan nomor urut untuk membuat kode transaksi
        const transactionCode = `Tra${time}`;

        return transactionCode;
    }

    const Add = () => {
        const payload = {
            kt_trans: kode,
            tgl_trans: tgl,
            kd_sup: kodeSuplier,
            userid: "user01",
            total_item: total,
            total_harga: totalHarga,
            discount: discount
        }
        apiAdd.AddList(payload)
            .then(res => doPromiseResolveAdd(res, { setInfoOpen, setInfoText }))
            .catch(err => doPromiseRejectAdd(err, { setInfoText, setInfoOpen }))
    }
    console.log(tgl);
    return (
        <div style={{ border: 'solid 2px black', margin: 20, padding: 20 }}>
            <div style={{ border: "solid 1px black", marginBottom: 20 }}>PEMASUKAN DATA PEMBUATAN PO</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <div style={{ width: 260 }}>
                    <div style={{ display: 'flex', width: 260 }}>
                        <h6 > KODE Transaksi</h6>
                        <div style={{ marginBottom: '3%', display: 'flex', marginLeft: '2%' }}>
                            <TextField
                                value={kode}
                                disabled={true}
                                id="outlined-basic"
                                label="Kode Transaksi"
                                variant="outlined" />
                        </div>
                    </div>
                    <div style={{ display: 'flex', width: 260 }}>
                        <h6 >Total Item Barang</h6>
                        <div style={{ marginBottom: '3%', display: 'flex' }}>
                            <TextField
                                value={total}
                                onChange={(e) => setTotal(e.target.value)}
                                id="outlined-basic"
                                label="Total Item Barang"
                                variant="outlined" />
                        </div>
                    </div>
                    <div style={{ display: 'flex', width: 260 }}>
                        <h6>Discount Barang</h6>
                        <div style={{ marginBottom: '3%', display: 'flex', marginLeft: '2%' }}>
                            <TextField
                                value={discount}
                                disabled={mode == "Edit" ? true : false}
                                onChange={(e) => setdiscount(e.target.value)}
                                id="outlined-basic"
                                label="Discount"
                                variant="outlined" />
                        </div>
                    </div>
                </div>
                <div style={{ width: 260 }}>
                    <div style={{ display: 'flex', width: 260 }}>
                        <h6 > TGl Transaksi</h6>
                        <div style={{ marginBottom: '3%', display: 'flex', marginLeft: '2%' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    disabled={mode == "Edit" ? true : false}
                                    renderInput={(params) => <TextField {...params} />}
                                    onChange={(newValue) => {
                                        setTgl(newValue.$d);
                                    }}

                                    value={tgl}
                                    label="TGL Transaksi"
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div style={{ display: 'flex', width: 260 }}>
                        <h6 > Total Harga</h6>
                        <div style={{ marginBottom: '3%', display: 'flex', marginLeft: '6%' }}>
                            <TextField
                                value={totalHarga}
                                disabled={mode == "Edit" ? true : false}
                                onChange={(e) => setTotalHarga(e.target.value)}
                                id="outlined-basic"
                                label="Kode Transaksi"
                                variant="outlined" />
                        </div>
                    </div>
                    <div style={{ display: 'flex', width: 260 }}>
                        <h6 > Kode Suplier</h6>
                        <div style={{ marginBottom: '3%', display: 'flex', marginLeft: '5%' }}>
                            <TextField
                                value={kodeSuplier}
                                disabled={mode == "Edit" ? true : false}
                                onChange={(e) => setKodeSuplier(e.target.val)}
                                id="outlined-basic"
                                label="Kode Suplier"
                                variant="outlined" />

                        </div>
                    </div>
                </div>
            </div>
            < Table
                cols={tableConfig}
                data={dataTables}
                add={Add}
            />
            <Button onClick={() => Cancel()}>Cancel</Button>
            <ModalInfo
                label={infotext}
                isOpen={isinfo}
                handleClose={() => setInfoOpen(false)}
            />
        </div>

    )
}

export default FromInput;