import React from "react"

type Status = {
    status: "pending" | "success" | "cancelled"
}

type StatusWithLabel = {
  label?: string;
};

type ClassStatusProps = {
  status: "0" | "1";
};

export const FailStatus: React.FC = () => {
    return (
        <span className="bg-red-100 text-red-500 text-sm px-3 py-1 rounded-lg">
        Gagal
        </span>
    )
}

export const SuccessStatus: React.FC<StatusWithLabel> = ({ label = "Berhasil" }) => {
    return (
        <span className="bg-green-100 text-green-500 text-sm px-3 py-1 rounded-lg">
        {label}
        </span>
    )
}

export const PendingStatus: React.FC<StatusWithLabel> = (props) => {
    const {label="Belum Bayar"} = props
    return (
        <span className="bg-yellow-100 text-yellow-500 text-sm px-3 py-1 rounded-lg">
        {label}
        </span>
    )
}

export const StatusDisplay: React.FC<Status> = (props) => {
    const {status} = props;
    return (
        <>
            {status === "pending" && (<PendingStatus />)}
            {status == "cancelled" && (<FailStatus />)}
            {status == "success" && (<SuccessStatus />)}
        </>
    )
}

export const ClassStatusDisplay: React.FC<ClassStatusProps> = (props) => {
    const {status} = props;
    return (
        <>
            {status == "0" && (<PendingStatus label="Sedang Berjalan" />)}
            {status == "1" && (<SuccessStatus label="Selesai" />)}
        </>
    )
}