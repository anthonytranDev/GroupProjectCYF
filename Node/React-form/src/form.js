import React, { Component } from "react";
import axios from "axios";
import ButtonExampleInverted from "./Button";
import CheckboxExampleShorthandElement from "./checkbox";
import DropdownExampleMultipleSelection from "./dropdown";
import TableExamplePadded from "./table";
import { Checkbox } from "semantic-ui-react";
import { checkServerIdentity } from "tls";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      locations: [],
      email: "",
      phone: "",
      otherSkills: "",
      description: "",
      teachable: "", //not too sure --running or teaching
      weekendAvailability: "true",
      weekdayAvailability: "true",
      otherAvailability: "true",
      classAvailability: "true",
      submissionDate: "",
      skill1: {},
      skill2: {},
      skill3: {},
      skill4: {},
      skill5: {},
      showTable: false,
      showDropdown: true
    };
    // This binding is necessary to make `this` work in the callback
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
    this.radioChange = this.radioChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.weekdayAvaiHandler = this.weekdayAvaiHandler.bind(this);
    this.classAvaiHandler = this.classAvaiHandler.bind(this);
    this.otherAvaiHandler = this.otherAvaiHandler.bind(this);
  }
  componentDidMount() {
    axios.get("http://localhost:8000/locations").then(result => {
      //console.log(result.data.locations);
      this.setState({ locations: result.data.locations });
      console.log("state", this.state);
    });
  }

  radioChange(event) {
    this.setState({
      weekendAvailability: event.currentTarget.value
    });
  }
  changeLocation(event) {
    this.setState({
      selectedLocation: event.target.value
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let volunteer = {
      firstName: this.state.firstname,
      lastName: this.state.lastname,
      locationID: this.state.location,
      email: this.state.email,
      phone: this.state.phone,
      weekendAvailability: this.state.weekendAvailability ? "NO" : "YES",
      weekdayAvailability: this.state.weekdayAvailability ? "NO" : "YES",
      otherAvailability: this.state.otherAvailability ? "NO" : "YES",
      classAvailability: this.state.classAvailability ? "NO" : "YES",
      otherSkills: this.state.otherSkills,
      skillLevel: {
        skill1: this.state.skill1,
        skill2: this.state.skill2,
        skill3: this.state.skill3,
        skill4: this.state.skill4,
        skill5: this.state.skill5
      }
    };
    console.log(volunteer);
    axios
      .post("http://localhost:8000/volunteers", { ...volunteer })
      .then(result => {
        console.log(result);
      });

    // this.setState({
    //   firstname: "",
    //   lastname: "",
    //   locations: [],
    //   email: "",
    //   phone: "",
    //   skillLevel: [],
    //   skillName: [],
    //   otherSkills: "",
    //   description: "",
    //   teachable: "", //not too sure --running or teaching
    //   weekendAvailability: "true",
    //   weekdayAvailability: "true",
    //   otherAvailability: "true",
    //   classAvailability: "true",
    //   submissionDate: "",
    //   skill1: "",
    //   skill2: "",
    //   skill3: "",
    //   skill4: "",
    //   skill5: ""
    // });
  }

  handleToggle() {
    this.setState(prevState => ({
      weekendAvailability: !prevState.weekendAvailability
    }));
  }

  updateSkill1 = event => {
    this.setState({
      skill1: {
        skillId: 1,
        skillLevel: event.currentTarget.getAttribute("aria-posinset")
      }
    });
  };

  updateSkill2 = event => {
    this.setState({
      skill2: {
        skillId: 2,
        skillLevel: event.currentTarget.getAttribute("aria-posinset")
      }
    });
  };

  updateSkill3 = event => {
    this.setState({
      skill3: {
        skillId: 3,
        skillLevel: event.currentTarget.getAttribute("aria-posinset")
      }
    });
  };

  updateSkill4 = event => {
    this.setState({
      skill4: {
        skillId: 4,
        skillLevel: event.currentTarget.getAttribute("aria-posinset")
      }
    });
  };

  updateSkill5 = event => {
    this.setState({
      skill5: {
        skillId: 5,
        skillLevel: event.currentTarget.getAttribute("aria-posinset")
      }
    });
  };
  //weekdayAvailabilityHandler
  weekdayAvaiHandler() {
    this.setState(prevState => ({
      weekdayAvailability: !prevState.weekdayAvailability
    }));
  }

  //classAvailabilityHandler
  classAvaiHandler() {
    this.setState(prevState => ({
      classAvailability: !prevState.classAvailability
    }));
  }

  //otherAvailabilityHandler
  otherAvaiHandler() {
    this.setState(prevState => ({
      otherAvailability: !prevState.otherAvailability
    }));
  }

  toggleTable = () => {
    this.setState({ showTable: !this.state.showTable });
  };

  handleInputChange = event => {
    const target = event.target;

    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label for="exampleInputFname">What's your first name? </label>
          <input
            type={Text}
            class="form-control"
            id="exampleInputName1"
            name="firstname"
            placeholder="Type your answer here .."
            value={this.state.firstname}
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label for="exampleInputLname">What's your last name? </label>
          <input
            type={Text}
            class="form-control"
            id="exampleInputLname1"
            name="lastname"
            placeholder="Type your answer here .."
            value={this.state.lastname}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <div>
            <label>
              <h4>Which CYF city would you like to volunteer for? </h4>
            </label>
          </div>
          <DropdownExampleMultipleSelection name="" />
          <div>
            <small id="cityHelp" class="form-text text-muted">
              If you're interested in bringing CYF to your city email us at
              contact@codeyourfuture.io.
            </small>
          </div>
          <div>
            <select
              onChange={this.handleChange}
              name="location"
              value={this.state.selectedLocation}
              required
            >
              <option value="0">Select city</option>
              {this.state.locations.map(loc => (
                <option value={loc.id}>
                  {loc.city} ( {loc.country})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label for="exampleInputEmail">What's your email address? </label>
            <input
              type="email"
              class="form-control"
              name="email"
              id="exampleInputEmail1"
              placeholder="Type your email here .."
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label for="exampleInputNumber">What's your phone number? </label>

            <input
              type={Number}
              class="form-control"
              id="exampleInputNumber1"
              name="phone"
              placeholder="Type your number here If you don't mind us contacting you this way.."
              value={this.state.phone}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label for="interest" required>
              <h4>Cool ! What are you interested in helping with ? </h4>
            </label>
          </div>

          <CheckboxExampleShorthandElement
            label="Teaching code or agile methodologies"
            name=""
          />
          <CheckboxExampleShorthandElement label="Running and growing the organisation" />
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.showTable}
            onChange={this.toggleTable}
          />
          <div>
            <label for="interest" required>
              <h3>What is your level of expertise in the following areas?</h3>
            </label>
          </div>
          {/* <TableExamplePadded handleSkill={this.onClick} /> */}
          <button onClick={this.toggleTable}>Toggle Table</button>

          {this.state.showTable && (
            <TableExamplePadded
              updateSkill2={this.updateSkill2}
              updateSkill1={this.updateSkill1}
              updateSkill3={this.updateSkill3}
              updateSkill4={this.updateSkill4}
              updateSkill5={this.updateSkill5}
            />
          )}
          {console.log(this.state)}
          <div>
            <label for="exampleInputSkill">
              What other web development related expertise could you bring to
              CYF?
            </label>

            <input
              type={Text}
              className="form-control"
              id="exampleInputSkill"
              name="otherSkills"
              placeholder=" Type your answer here .."
              value={this.state.otherSkills}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label for="exampleInputAvail" required>
              <h4>
                Awesome. Would you be available to help during our classes on
                Saturdays/Sundays?
              </h4>
            </label>

            <Checkbox toggle onChange={this.handleToggle} />
            <span> {this.state.weekendAvailability ? "NO" : "YES"}</span>
            <br />
          </div>
          <div>
            <label>
              <h4>In which of these areas could you see yourself helping?</h4>
            </label>
          </div>
          {this.state.showDropdown && (
            <DropdownExampleMultipleSelection name="" />
          )}
        </div>
        <div>
          <div>
            <label>
              <h4>Awesome. When would you be available to help?</h4>
            </label>
          </div>
          <div>
            <small class="form-text text-muted">
              select as many as you like
            </small>
          </div>
          <div>
            <label>During our classes on Saturdays/Sundays</label>
            <Checkbox toggle onChange={this.classAvaiHandler} />
            <span> {this.state.classAvailability ? "NO" : "YES"}</span>
          </div>
          <div>
            <label>During the week</label>
            <Checkbox toggle onChange={this.weekdayAvaiHandler} />
            <span> {this.state.weekdayAvailability ? "NO" : "YES"}</span>
          </div>
          <div>
            <label>Other</label>
            <Checkbox toggle onChange={this.otherAvaiHandler} />
            <span> {this.state.otherAvailability ? "NO" : "YES"}</span>
          </div>

          {/* <DropdownExample2 /> */}
          <br />
          <br />
        </div>
        <div>
          <ButtonExampleInverted placeHolder="Submit" />
        </div>
      </form>
    );
  }
}
export default Form;
