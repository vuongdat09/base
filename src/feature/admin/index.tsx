import { useGetProductsQuery  , useRemoveProductMutation} from "@/api/product";
import { iProduct } from "@/interface/product";
import { Space, Table,Popconfirm, message , Alert} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from "react-router-dom";

const List = () => {
    const {data:productData} = useGetProductsQuery()
    const [messageApi , contextHolder] = message.useMessage()
    const [removeProduct , {isLoading: isLoadingProduct}] = useRemoveProductMutation()


    const dataSoucer = productData?.map((item:iProduct)=>({
        key: item.id,
        name: item.name,
        price: item.price
    }))

    const confirm = (id:iProduct)=>{
        removeProduct(id).unwrap().then(()=>{
            messageApi.open({
                type: 'success',
                content:'chắc chắn xóa'
            }),
            setTimeout(()=>{
                
            },3000)
        })
    }

  const columns= [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      key: "action",
      render: ({key:id}:{key:string|number}) => (
        <div className="p-2">
        <Popconfirm title="Sure to delete?" onConfirm={() => confirm(id)}>
            <a>Delete</a>
        </Popconfirm>
        <Link to={`/admin/${id}`}>
            <button className="p-2">update</button>
        </Link>
        </div>

      ),
    },
  ];
  return <>
  <a href="/admin/add">add</a>
  {contextHolder}
  {<Table columns={columns} dataSource={dataSoucer} />}
  </>;
};

export default List;
