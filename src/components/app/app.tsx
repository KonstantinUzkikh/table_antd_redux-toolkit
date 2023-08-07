import React, { useState } from 'react';
import { FC } from 'react';

import { Button } from 'antd';

import _ from 'lodash';

import styles from './app.module.scss'
import Search from 'antd/es/input/Search';
import Modal from 'antd/es/modal/Modal';
import ListOfDevelopers from '../table/table';
import { ITableState, RootState, closeForm, setCurrentRow, useAppDispatch, useAppSelector } from '../../store';
import { loadDataAsync } from '../../store';
import FormPerson from '../form/form';
import { ITableRec, initialFieldsValues } from '../../utils';
import { IFormState, loadFormData } from '../../store/formSlice';
import dayjs from 'dayjs';

const App: FC = () => {

  const dispatch = useAppDispatch();

  const { table } = useAppSelector((state: RootState): ITableState => state.table);
  const { isOpen } = useAppSelector((state: RootState): IFormState => state.form);

  const [valueSeach, setValueSeach] = useState('');
  const [isSeach, setIsSeach] = useState(false);

  const handleAddRow = () => {
    dispatch(loadFormData(initialFieldsValues))
  }

  const handleOnSeach = (value: string) => {
    setIsSeach(true);
    const result = _.find(table, (obj: ITableRec) => {
      const { name, vocation, date, projects } = obj
      return (
        name.includes(value)
        || vocation.includes(value)
        || projects === Number(value)
        || dayjs(date).format('DD/MM/YYYY') === (value)
      )
    });
    result && dispatch(setCurrentRow(result.id))
    setValueSeach('');
    setIsSeach(false);
  }

  return (
    <>
      <header className={styles.header} onClick={() => dispatch(setCurrentRow(''))}>
        <h1>Наша команда</h1>
      </header>
      <main className={styles.boxMain} onClick={() => dispatch(setCurrentRow(''))}>
        <div className={styles.boxTableActions}>
          <div><Button type="primary" onClick={() => dispatch(loadDataAsync())}>Загрузить данные</Button></div>
          <div className={styles.inputSeach} onClick={(e) => e.stopPropagation()}>
            <Search
              placeholder="введите текст для поиска"
              value={valueSeach}
              onChange={(e) => setValueSeach(e.target.value)}
              onSearch={handleOnSeach}
              loading={isSeach}
              enterButton={valueSeach !== '' || isSeach ? true : (<button style={{ display: 'none' }}></button >)}
              onKeyDown={(e) => (e.key === 'Escape' && setValueSeach(''))}
            />
          </div>
          <div><Button type="primary" onClick={handleAddRow}>Добавить строку</Button></div>
        </div>
        <ListOfDevelopers valueSeach={valueSeach} />
        <span className={styles.quantity}>{`Количество записей в таблице: ${table.length}`}</span>
      </main>
      <footer className={styles.footer} onClick={() => dispatch(setCurrentRow(''))}>
        <p className={styles.autor}>
          &copy; Константин Узких
        </p>
      </footer>

      <Modal
        title='Данные сотрудника'
        open={isOpen}
        onCancel={() => dispatch(closeForm())}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <FormPerson />
      </Modal>
    </>
  )
}

export default App;
