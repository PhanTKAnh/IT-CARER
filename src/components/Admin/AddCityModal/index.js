import { Modal, Input, Form } from "antd";

const AddCityModal = ({ visible, onCancel, onAddCity }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onAddCity(values.cityName); 
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      title="Thêm thành phố"
      visible={visible}
      onOk={handleOk}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      okText="Lưu"
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical" name="add_city_form">
        <Form.Item
          name="cityName"
          label="Tên thành phố"
          rules={[{ required: true, message: "Vui lòng nhập tên thành phố!" }]}
        >
          <Input placeholder="Nhập tên thành phố" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCityModal;
