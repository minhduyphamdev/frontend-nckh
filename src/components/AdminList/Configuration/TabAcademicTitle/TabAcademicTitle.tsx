import React, { useRef, useState } from 'react';
import { SearchOutlined, MinusOutlined, EditOutlined } from '@ant-design/icons';
import { InputRef } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { PlusOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Checkbox } from '@mui/material';
import ModalAcademicTitle from './ModalAcademicTitle';

interface DataType {
    key: number;
    id: number;
    idTeacher: number;
    nameTitle: string;
    createAt: string;
    updateAt: string;
}
const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        id: i,
        idTeacher: 0,
        nameTitle: '',
        createAt: '',
        updateAt: '',
    });
}

const TabAcademicTitle: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const [open, setOpen] = useState(false);

    const navigate = useNavigate();
    const [formType, setFormType] = useState<'create' | 'update'>('create');

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: keyof DataType
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: keyof DataType): ColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}>
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}>
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}>
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? 'search-outlined-filtered' : 'search-outlined-not-filtered' }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) => (searchedColumn === dataIndex ? text : text)
    });

    const columns: ColumnsType<DataType> = [
        {
            title: '',
            dataIndex: '',
            key: 'x',
            width: '3%',
            render: (text, record) => (
                <Checkbox />
            )
        },
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '12%',
            ...getColumnSearchProps('id'),
            onCell: () => {
                return {
                    onClick: (ev) => {
                        navigate('/detail-page');
                    }
                };
            }
        },
        {
            title: 'ID Giảng viên',
            dataIndex: 'idTeacher',
            key: 'idTeacher',
            width: '20%',
            ...getColumnSearchProps('idTeacher')
        },
        {
            title: 'Tên học vị',
            dataIndex: 'nameTitle',
            key: 'nameTitle',
            width: '22%',
            ...getColumnSearchProps('nameTitle')
        },
        {
            title: 'Được tạo vào lúc',
            dataIndex: 'createAt',
            key: 'createAt',
            width: '21%',
            ...getColumnSearchProps('createAt')
        },
        {
            title: 'Cập nhật vào lúc',
            dataIndex: 'updateAt',
            key: 'updateAt',
            width: '21%',
            ...getColumnSearchProps('updateAt')
        },
        {
            title: '',
            dataIndex: '',
            key: 'x',
            width: '3%',
            render: (text, record) => (
                <EditOutlined className="edit-button" style={{ cursor: "pointer" }} onClick={handleUpdate} />
            )
        }
    ];

    const handleCreate = () => {
        setFormType('create');
        setOpen(true);
    };
    const handleUpdate = () => {
        setFormType('update');
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    return <>
        {
            <>
                <div className='header_table'>
                    <span className='title_table'>Danh sách học vị</span>
                    <button className='button2' onClick={handleCreate}><PlusOutlined style={{ marginRight: "10px" }} />Thêm</button>
                    <button className='button2' style={{ marginLeft: "10px" }}><MinusOutlined style={{ marginRight: "10px" }} />Xóa</button>
                </div>

                <Table
                    pagination={{ pageSize: 7 }}
                    columns={columns}
                    dataSource={data}
                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                />

                <Modal
                    className='title_modal'
                    title={formType === "create" ? "Thêm học vị" : "Sửa học vị"}
                    centered
                    open={open}
                    onOk={() => setOpen(false)}
                    onCancel={handleCancel}
                    width={800}
                    destroyOnClose
                >
                    <ModalAcademicTitle formType={formType} />
                </Modal>
            </>
        }
    </>
};

export default TabAcademicTitle;
