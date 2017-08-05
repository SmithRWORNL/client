import React from 'react';
import staticLists from '../staticJson/staticLists';
import {observer} from "mobx-react";


@observer
export default class OrgsModalContent extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		let orgNames = [];

				const SpecificField = this.props.SpecificField;
				const data = this.props.data;



				if (this.props.type == 'sponsoring_organizations') {
					orgNames = staticLists.sponsorOrgs;
				} else if (this.props.type == 'research_organizations') {
					orgNames = staticLists.researchOrgs;
				}



		return(

            <div className="container-fluid form-horizontal">

                    <SpecificField field="DOE" label="DOE Organization?" elementType="checkbox"  />
                    <SpecificField  field="organization_name" label="Name" elementType="select" allowCreate={true} placeholder="Enter or select from the list your organization" options={orgNames}   />
                    {data.getValue("primary_award") !== undefined &&
                    <SpecificField  field="primary_award" label="Primary Award" elementType="input"  />
                    }

                    {this.props.data.getValue("award_numbers") !== undefined &&
                    <SpecificField field="award_numbers" label="Additional Awards" elementType="select" allowCreate={true} multi={true} placeholder="Enter any additional awards"   />
                    }

                    {this.props.data.getValue("br_codes") !== undefined &&
                    <SpecificField field="br_codes" label="B&R Codes" elementType="select" allowCreate={true} multi={true} placeholder="Enter B&R Codes"   />
                    }

                    {this.props.data.getValue("fwp_numbers") !== undefined &&
                    <SpecificField field="fwp_numbers" label="FWP Numbers" elementType="select" allowCreate={true} multi={true} placeholder="Enter FWP Numbers"   />
                    }

            </div>
		);
	}

}
