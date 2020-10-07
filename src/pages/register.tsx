import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';
import Footer from '../components/layout/Footer';
import Button from '../components/Button';
import Card from '../components/Card';
import FooterImage from '../components/FooterImage';
import SEO from '../components/SEO';
import { RegistrantDTO } from '../data/registrant.dto';
import Header from '../components/layout/Header';
import * as tooltip from '../components/ToolTips'

// @ts-ignore
import regData from '../../content/registration.yaml';

const apiUrl = process.env.GATSBY_API_URL || `https://makeuc-registration-dev.herokuapp.com`;

const SUCCESS = 201;
const ALREADY_EXISTS = 400;
const SERVER_ERROR = 500;

export default () => {
  const { register, errors, handleSubmit } = useForm<RegistrantDTO>();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ accept: `.pdf`, multiple: false });
  const [ submitting, setSubmitting ] = useState(false);
  const [ result, setResult ] = useState<number>(0);

  const onSubmit = async (data: RegistrantDTO, event: React.BaseSyntheticEvent) => {
    setResult(0);
    setSubmitting(true);

    const formData = new FormData(event.target);
    if(acceptedFiles.length) {
      formData.set(`resume`, acceptedFiles[0], acceptedFiles[0].name);
    }
    try {
      const res = await fetch(`${apiUrl}/registrant`, {
        method: `POST`,
        body: formData
      });

      setResult(res.status);
    } catch (err) {
      setResult(SERVER_ERROR);
    } finally {
      window.scrollTo({ top: 0, behavior: `smooth` });
      setSubmitting(false);
    }
  };

  return <>
    <SEO />
    <main>
      <Header page="register" />
      <section id="features" className="py-20 lg:pt-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl lg:text-5xl font-semibold"
          style={{  
            textDecoration: 'underline',
            textDecorationColor: '#8ae9c1'
          }}
          >REGISTRATION FORM</h2>
          <div className="flex flex-col sm:flex-row sm:-mx-3 mt-12">
            <div className="flex-1 px-3">
              <Card className="mb-0">
                {/* Comment this out when registration is closed and live site is up */}
                {/* {(result === SUCCESS) ?
                  <div className="flex items-center bg-secondary-darker text-black text-sm font-bold px-4 py-3" role="alert">
                    <p>We have sent you a confirmation email. In order to complete the sign-up process, 
                      please click on the confirmation link. It might have landed in your spam folder.</p>
                  </div> :
                  <>
                    {
                      (result === ALREADY_EXISTS) ?
                        <div className="flex items-center bg-red-700 text-white text-sm font-bold px-4 py-3" role="alert">
                          <p>
                            This email has already been registered with us. If you have not received a confirmation email, please contact us at <a href="mailto:info@makeuc.io" className="text-secondary">info@makeuc.io</a>
                          </p>
                        </div> :
                      (result === SERVER_ERROR) ?
                        <div className="flex items-center bg-red-700 text-white text-sm font-bold px-4 py-3" role="alert">
                          <p>
                            There was a problem with the registration, please try again or contact us at <a href="mailto:info@makeuc.io" className="text-secondary">info@makeuc.io</a>
                          </p>
                        </div> : ``
                    }
                    <br />
                    <form className="w-full max-w-5xl mx-auto register-form" onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-4 text-left">
                        <label
                          className="block text-sm font-bold mb-2"
                          htmlFor="fullName"
                        >
                          Full Name{errors.fullName && <span className="text-red-500 text-xs italic">&nbsp;&nbsp;required field</span>}
                        </label>
                        <input
                          ref={register({ required: true })}
                          className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                          name="fullName"
                          type="text"
                          placeholder="Jon Doe"
                        />
                      </div>
                      <div className="mb-4 text-left">
                        <label className="block text-sm font-bold mb-2" htmlFor="email">
                          Email{errors.email && <span className="text-red-500 text-xs italic">&nbsp;&nbsp;required field</span>}
                        </label>
                        <input
                          ref={register({ required: true })}
                          className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                          name="email"
                          type="email"
                          placeholder="jon.doe@starfleet.edu"
                        />
                      </div>
                      <div className="mb-4 text-left">
                        <label className="block text-sm font-bold mb-2" htmlFor="school">
                          School{errors.school && <span className="text-red-500 text-xs italic">&nbsp;&nbsp;required field</span>}
                        </label>
                        <input
                          ref={register({ required: true })}
                          className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                          name="school"
                          type="text"
                          placeholder="Starfleet Academy"
                          list="schools"
                        />
                        <datalist id="schools">
                          {regData.schools.map(school => <option key={school} value={school}>{school}</option>)}
                        </datalist>
                      </div>
                      <div className="mb-4 text-left">
                        <label
                          className="block text-sm font-bold mb-2"
                          htmlFor="country"
                        >
                          Country{errors.country && <span className="text-red-500 text-xs italic">&nbsp;&nbsp;required field</span>}
                        </label>
                        <select
                          ref={register({ required: true })}
                          name="country"
                          className="shadow appearance-none border w-full rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        >
                          <option value="">Select an option</option>
                          {regData.countries.map(country => <option key={country} value={country}>{country}</option>)}
                        </select>
                      </div>

                      <div className="mb-4 text-left">
                        <label className="block text-sm font-bold mb-2" htmlFor="degree">
                          Degree{errors.degree && <span className="text-red-500 text-xs italic">&nbsp;&nbsp;required field</span>}
                        </label>
                        <input
                          ref={register({ required: true })}
                          className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                          name="degree"
                          type="text"
                          placeholder="Degree"
                          list="degrees"
                        />
                        <datalist id="degrees">
                          {regData.degrees.map(degree => <option key={degree} value={degree}>{degree}</option>)}
                        </datalist>
                      </div>
                      <div className="mb-4 text-left">
                        <label className="block text-sm font-bold mb-2" htmlFor="degree">
                          Major(s){errors.major && <span className="text-red-500 text-xs italic">&nbsp;&nbsp;required field</span>}
                        </label>
                        <input
                          ref={register({ required: true })}
                          className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                          name="major"
                          type="text"
                          placeholder="Major"
                          list="majors"
                        />
                        <datalist id="majors">
                          {regData.majors.map(major => <option key={major} value={major}>{major}</option>)}
                        </datalist>
                      </div>
                      <div className="mb-4 text-left">
                        <label
                          className="block text-sm font-bold mb-2"
                          htmlFor="graduation"
                        >
                          Expected Graduation Year{errors.graduation && <span className="text-red-500 text-xs italic">&nbsp;&nbsp;required field</span>}
                        </label>
                        <input
                          ref={register({ required: true })}
                          className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                          name="graduation"
                          type="number"
                          min="2000"
                          max="2040"
                          placeholder="2023"
                          maxLength={4}
                        />
                      </div>
                      <div className="mb-4 text-left">
                        <label
                          className="block text-sm font-bold mb-2"
                          htmlFor="hackathonsAttended"
                        >
                          Number of Hackathons Attended{errors.hackathonsAttended && <span className="text-red-500 text-xs italic">&nbsp;&nbsp;required field</span>}
                        </label>
                        <select
                          ref={register({ required: true })}
                          name="hackathonsAttended"
                          className="shadow appearance-none border w-full rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        >
                          <option value="">Select an option</option>
                          {regData.hackathonsAttended.map(option => <option key={option} value={option}>{option}</option>)}
                        </select>
                      </div>
                      <div className="mb-4 text-left">
                        <label
                          className="block text-sm font-bold mb-2"
                          htmlFor="resume"
                        >
                          Resume - <i>Optional</i><tooltip.Resume />
                        </label>
                        <div {...getRootProps({ className: `dropzone` })}>
                          <input {...getInputProps()} />
                          <span className="text-sm italic">{
                            acceptedFiles.length ? acceptedFiles[0].name :
                            `Drop your file in here, or click to browse (PDF only)`
                          }</span>
                        </div>
                      </div>
                      <div className="mb-4 text-left">
                        <label
                          className="block text-sm font-bold mb-2"
                          htmlFor="ethnicity"
                        >
                          Ethnicity{errors.ethnicity && <span className="text-red-500 text-xs italic">&nbsp;&nbsp;required field</span>}
                        </label>
                        <select
                          ref={register({ required: true })}
                          name="ethnicity"
                          className="shadow appearance-none border w-full rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        >
                          <option value="">Select an option</option>
                          {regData.ethnicities.map(ethnicity => <option key={ethnicity} value={ethnicity}>{ethnicity}</option>)}
                        </select>
                      </div>
                      <div className="mb-4 text-left">
                        <label className="block text-sm font-bold mb-2" htmlFor="gender">
                          Gender{errors.gender && <span className="text-red-500 text-xs italic">&nbsp;&nbsp;required field</span>}
                        </label>
                        <select
                          ref={register({ required: true })}
                          name="gender"
                          className="shadow appearance-none border w-full rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        >
                          <option value="">Select an option</option>
                          {regData.genders.map(gender => <option key={gender} value={gender}>{gender}</option>)}
                        </select>
                      </div>
                      <div className="mb-4 text-left">
                        <label
                          className="block text-sm font-bold mb-2"
                          htmlFor="questions"
                        >
                          Notes - <i>Optional</i><tooltip.Questions />
                        </label>
                        <input
                          ref={register}
                          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                          name="questions"
                          type="text"
                          placeholder="Notes"
                        />
                      </div>
                      <div className="text-left text-sm">
                        <label>
                          <input
                            name="agreed"
                            ref={register({ validate: v => v })}
                            type="checkbox"
                            className="mr-2 leading-tight"
                          />
                          I have read and agree to the <a 
                            target="_blank"
                            aria-label = "Code of Conduct"
                            rel="noopener noreferrer"
                            className="light-link" 
                            href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
                          >
                            MLH Code of Conduct</a>.
                        </label>
                        {errors.agreed && <span className="text-red-500 font-bold text-xs italic">&nbsp;&nbsp;Please check this box</span>}
                      </div>
                      <div className="text-left text-sm">
                        <label>
                          <input
                            name="authorized"
                            ref={register({ validate: v => v })}
                            type="checkbox"
                            className="mr-2 leading-tight"
                          />
                          I authorize you to share my application/registration information for event administration, ranking, MLH administration, 
                          pre- and post-event informational e-mails, and occasional messages about hackathons in-line with the <a 
                            target="_blank"
                            aria-label = "MLH Privacy Policy"
                            rel="noopener noreferrer"
                            className="light-link" 
                            href="https://mlh.io/privacy"
                          >
                          MLH Privacy Policy</a>. I further agree to the terms of both the <a 
                            target="_blank"
                            aria-label = "MLH Contest Terms and Conditions"
                            rel="noopener noreferrer"
                            className="light-link" 
                            href="https://github.com/MLH/mlh-policies/tree/master/prize-terms-and-conditions"
                          >
                          MLH Contest Terms and Conditions</a> and the <a 
                            target="_blank"
                            aria-label = "MLH Privacy Policy"
                            rel="noopener noreferrer"
                            className="light-link" 
                            href="https://mlh.io/privacy"
                          >
                            MLH Privacy Policy</a>.
                        </label>
                        {errors.authorized && <span className="text-red-500 font-bold text-xs italic">&nbsp;&nbsp;Please check this box</span>}
                      </div>
                      <div className="md:items-center py-20 lg:pb-20 lg:pt-10">
                        <Button
                          size="default"
                          type="submit"
                          className="shadow focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                          disabled={submitting}
                        >
                          {submitting ? <FaSpinner className="spinner" /> : `REGISTER`}
                        </Button>
                      </div>
                    </form>
                  </>
                } */}

                {/* Comment this out when registration opens up */}
                <div className="flex items-center bg-secondary-darker text-black text-xl font-bold px-4 py-3" role="alert">
                  <p>Registration is closed for this year, please check us out next year!</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <FooterImage />
    </main>
    <Footer />
  </>;
};
