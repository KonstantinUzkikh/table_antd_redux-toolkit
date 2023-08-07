/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";

import { Space } from "antd";
import Table, { ColumnsType } from "antd/es/table";

import { ITableRec } from '../../utils';
import { useAppDispatch, useAppSelector, RootState, delRow, loadFormData, setCurrentRow } from "../../store";

import { ReactComponent as PenPic } from '../../images/pen.svg'
import { ReactComponent as TrashPic } from '../../images/trash.svg'
import styles from './table.module.scss'
import { ITableState } from "../../store";
import dayjs from "dayjs";

interface ITableProps {
  valueSeach: string,
}

const ListOfDevelopers = ({ valueSeach }: ITableProps) => {

  const dispatch = useAppDispatch();

  const { status, table, currentRowId } = useAppSelector((state: RootState): ITableState => state.table);

  const selectSeach = (text: string) => {
    return {
      props: {
        style: valueSeach !== '' && text.includes(valueSeach) ? { color: 'red' } : {}
      },
      children: <span>{text}</span>
    };
  }

  const columns: ColumnsType<ITableRec> = [
    {
      title: 'Полное имя',
      dataIndex: 'name',
      key: 'name',
      className: `${styles.name}`,
      sorter: (a, b) => a.name > b.name ? 1 : -1,
      render: (text, record) => selectSeach(text)
    },
    {
      title: 'Профессия',
      dataIndex: 'vocation',
      key: 'vocation',
      className: `${styles.vocation}`,
      filters: [
        {
          text: 'Frontender',
          value: 'Frontender',
        },
        {
          text: 'Backender',
          value: 'Backender',
        },
      ],
      onFilter: (value: string | number | boolean, record) => typeof value === 'string' ? record.vocation.indexOf(value) === 0 : false,
      sorter: (a, b) => a.vocation > b.vocation ? 1 : -1,
      render: (text, record) => selectSeach(text)
    },
    {
      title: "Дата приема на работу",
      dataIndex: 'date',
      key: 'date',
      className: `${styles.date}`,
      align: 'center',
      render: (date: dayjs.Dayjs) => selectSeach(dayjs(date).format('DD/MM/YYYY')),
      sorter: (a, b) => Number(a.date) - Number(b.date),

    },
    {
      title: 'Количество проектов (ед.)',
      dataIndex: 'projects',
      key: 'projects',
      className: `${styles.projects}`,
      align: 'center',
      sorter: (a, b) => a.projects - b.projects,
      filters: [
        {
          text: '> 5',
          value: 5,
        },
      ],
      onFilter: (value: string | number | boolean, record: ITableRec) => typeof value === 'number' ? record.projects > value : false,
      render: (text, record) => selectSeach(String(text))
    },
    {
      title: 'Действия',
      dataIndex: 'actions',
      key: 'actions',
      className: `${styles.actions}`,
      align: 'center',
      render: (text, record, index) => (
        <>
          <div id={record.id} >
            <Space size="middle">
              <a onClick={() => dispatch(loadFormData(record))}><PenPic /></a>
              <a onClick={() => dispatch(delRow(record.id))}><TrashPic /></a>
            </Space>
          </div>
        </>
      ),
    },
  ];

  useEffect(() => {
    if (currentRowId !== '') {
      const element = document.getElementById(currentRowId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [currentRowId]);

  return (
    <>
      <Table
        className={styles.table}
        columns={columns}
        dataSource={table}
        loading={status === 'loading'}
        rowKey={(row: ITableRec) => row.id}
        scroll={{ y: 600 }}
        pagination={false}
        rowClassName={(record, index) => {
          if (record.id === currentRowId) {
            return `${styles.rowHighlight}`
          }
          return ``
        }}
      />
    </>
  )
}

export default ListOfDevelopers
