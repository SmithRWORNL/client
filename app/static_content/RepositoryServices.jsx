import React from 'react';
import ReactDOM from 'react-dom';
import {Modal, Button} from 'react-bootstrap';
import ImageLink from '../fragments/ImageLink';

export default class RepositoryServices extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="row not-so-wide-row">
        <div className="col-md-3"></div>
        <div className="col-md-6 col-xs-12 static-content">
          <h2 className="static-content-title">Repository Services</h2>
          <br/>
          <div className='row'>
            <div className='col-md-5 col-xs-12 center-text'>
              <strong>Create a new project on our open source GitHub community:</strong>
              <br/>
              <br/>
              <br/>
              <ImageLink linkTarget='_blank' linkURL='https://github.com/doecode/' imageURL='https://www.aha.io/assets/github.7433692cabbfa132f34adb034e7909fa.png' width='350' height='150'/>
            </div>
            <div className='col-md-2 center-text'>
              <h2>OR</h2>
            </div>
            <div className='col-md-5 col-xs-12 center-text'>
              <strong>Create a new project on our internal&nbsp;
                <a href="http://gitlab.osti.gov/">DOE CODE repository</a>&nbsp; where you can control access to the project.
              </strong>
              <br/>
              <br/>
              <ImageLink linkTarget='_blank' linkURL='http://gitlab.osti.gov/' imageURL='https://tctechcrunch2011.files.wordpress.com/2015/09/gitlab.png' width='350' height='150'/>
            </div>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    );
  }
}