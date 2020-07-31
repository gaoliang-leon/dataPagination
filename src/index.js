import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Table, Tag} from 'antd';
import 'antd/dist/antd.css';
const { Column} = Table;


class App extends Component{
  constructor(props){
    super(props);
    this.state={
        dataSource:[],
        count:0,
        
    }
}

componentDidMount(){
   
    axios.get('https://www.tabtu.top/pic/100.json')
        .then(res=>{
            let list=res.data.map(item=>{item.key=item._id; return item});
            this.setState({
                dataSource:list,
                count:res.data.length
            }
            )
        })
}
render(){
    return(
        <Table dataSource={this.state.dataSource} 
            pagination={{total:this.state.count,pageSize:20,showSizeChanger:false, position:['bottomCenter']}}
            tableLayout={'fixed'}
            bordered
        >
            <Column title="Name" dataIndex="name" key="name" />
            <Column title="ID" dataIndex="_id" key="_id" />
            <Column title="Index" dataIndex="index" key="index" />
            <Column 
                title="IsActive" 
                dataIndex="isActive" 
                key="isActive" 
                render={isActive=> isActive?'true':'false'}

            />
            <Column 
                title="Picture" 
                dataIndex="picture" 
                key="picture"
                render={picture=>(
                  <a href={picture}>{picture}</a>
                )}
            />
            <Column
                title="Tags"
                dataIndex="tags"
                key="tags"
                render={tags => (
                    <>
                    {tags.map(tag => (
                        <Tag color={'blue'} key={tag}>
                        {tag}
                        </Tag>
                    ))}
                    </>
                )}
            />
        </Table>
    )
}
}
ReactDOM.render(
  <App/>,
  document.getElementById('root')
);

