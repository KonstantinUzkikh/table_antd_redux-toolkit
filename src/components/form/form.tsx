import React, { useState, useEffect } from 'react';
import { Button, DatePicker, Form, Input, InputNumber, Select, Space } from 'antd';
import { IFormState, RootState, addRow, closeForm, editRow, useAppDispatch, useAppSelector } from '../../store';

const FormPerson = () => {

  const dispatch = useAppDispatch();

  const { isOpen, fields } = useAppSelector((state: RootState): IFormState => state.form);
  const { id, name, vocation, date, projects } = fields;

  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const [submittable, setSubmittable] = useState(false);

  const handleSave = () => {
    id === ''
      ? dispatch(addRow(values))
      : dispatch(editRow({ id, name: values.name, vocation: values.vocation, date: values.date, projects: values.projects }));
    dispatch(closeForm());
  };

  const handleReset = () => dispatch(closeForm());

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => setSubmittable(true),
      () => setSubmittable(false),
    );
  }, [values, form]);

  useEffect(() => {
    isOpen
      ? form.setFieldsValue({ name, vocation, date, projects })
      : form.setFieldsValue({})
  }, [isOpen, form]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Form
      labelCol={{ span: 7 }}
      size={'small'}
      style={{ maxWidth: 550 }}
      form={form}
      name='person'
      scrollToFirstError
    >

      <Form.Item
        name='name'
        label='Полное имя:'
        tooltip='Фамилия, имя, отчество'
        rules={[{ required: true, message: 'Пожалуйста укажите полное имя!', whitespace: true }]}
      >
        <Input placeholder='Иванов Иван Иванович' />
      </Form.Item>

      <Form.Item
        name='vocation'
        label='Профессия:'
        rules={[{ required: true, message: 'Пожалуйста укажите профессию!' }]}
      >
        <Select placeholder='Frontender'>
          <Select.Option value='Frontender'>Frontender</Select.Option>
          <Select.Option value='Backender'>Backender</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name='date'
        label='Дата:'
        validateFirst={'parallel'}
        tooltip='Дата приема на работу'
        rules={[{ required: true, message: 'Пожалуйста укажите дату!' }]}
        // valuePropName={'date'}
      >
        <DatePicker style={{ width: '100%' }} placeholder='01/01/2023' format={'DD/MM/YYYY'}/>
      </Form.Item>

      <Form.Item
        name='projects'
        label='Проекты (ед.):'
        tooltip='Количество реализованных проектов'
        rules={[{ required: true, message: 'Пожалуйста укажите количество проектов!' }]}
      >
        <InputNumber style={{ width: '100%' }} placeholder='5' min={0} max={100} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 7 }}>
        <Space size={'large'}>
          <Button type='default' htmlType='reset' onClick={handleReset}>
            Отменить
          </Button>
          <Button type="primary" htmlType="submit" disabled={!submittable} onClick={handleSave}>
            Сохранить
          </Button>
        </Space>
      </Form.Item>

    </Form>
  );
};

export default FormPerson;
