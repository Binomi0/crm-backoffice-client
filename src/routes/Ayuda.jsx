import React, { Component } from 'react';
import Header from '../components/Header';
import Card, {CardHeader} from 'material-ui/Card'

class Ayuda extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <Header title="Ayuda"/>
                <Card style={{margin: 10}} >
                    <CardHeader title="Ayuda" subheader="Sección de ayuda de CRM" />
                </Card>
            </div>
        )
    }
}

export default Ayuda;