import LatestAttestation from './LatestAttestation';
import LatestCommitment from './LatestCommitment';
import MainstayInfo from './MainstayInfo';

import Flickity from 'react-flickity-component';
import 'flickity/dist/flickity.min.css';
import {Button} from 'reactstrap';
import SignUpModal from './modals/SignUpModal';

import React from 'react';
import Login from "./Login";

const flickityOptions = {
    initialIndex: 0,
    prevNextButtons: false,
    setGallerySize: false
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalLogin: false
        };
    }

    toggleSignUpModal = () => {
        this.setState({modalLogin: !this.state.modalLogin});
    };

    toggleSlider = () => {
        if(document.querySelector('body').classList.contains('slider-hidden')) {
          document.querySelector('body').classList.remove('slider-hidden');
        } else {
          document.querySelector('body').classList.add('slider-hidden');
        }
    };

    onSignUpSuccess = (res) => {
        this.setState({modalLogin: false});
        swal({
            text: 'Thank you!\nYou will shortly receive an email asking you to confirm your email address.',
            icon: 'success',
            className: 'success',
            closeOnClickOutside: true
        });
    };
    onSignUpError = (error) => {
        swal({
            text: error.response.data.message || 'Something went wrong',
            icon: 'error',
            className: 'error',
            closeOnClickOutside: true
        });
    };

    nextButton = () => {
        this.flkty.next()
    }

    prevButton = () => {
        this.flkty.previous()
    }

    render() {
        return (
            <div className="row mx-0 home-content" data-controller="homepageMempool">
              <div className="col-12 col-lg-12 px-0 carousel-wrapper">
             {/*   <div className="carousel-toggle" onClick={this.toggleSlider}><img src="icon-eye-close.svg" /></div>*/}
                <Flickity flickityRef={c => this.flkty = c}
                  className={'carousel'} // default ''
                  elementType={'div'} // default 'div'
                  options={flickityOptions} // takes flickity options {}
                  disableImagesLoaded={false} // default false

                  static // default false

                >
                <div className="carousel-cell">
                    <div className="carousel-image">
                        <img src="slider-first.svg"/>

                        <div className="carousel-image__overlay">
                            <p>Sign-up to MainStay   <br/> and start generating  <br/> Your data proofs</p>

                        <div className="carousel-image__buttons">
                            <Button color="success" onClick={this.toggleSignUpModal}>
                                Sign Up
                            </Button>
                            <Button color="transparent" onClick={this.nextButton}>Learn how MainStay works →</Button>
                        </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-cell">
                    <div className="carousel-box">
                        <div className="container px-0">
                            <div className="row no-gutters">
                              <div className="col-12"><h1>Use Cases</h1></div>
                              <div className="col-6 col-md-4">
                                <div className="carousel-box__item">
                                  <img src="icon-securing.svg" />
                                    <div>
                                        <p><strong>Securing Blockchains</strong></p>
                                        <p>Secure any blockchain with asset, security tokens or other registry tokens.</p>
                                    </div>
                                </div>
                              </div>
                              <div className="col-6 col-md-4">
                                <div className="carousel-box__item">
                                  <img src="icon-verifiable.svg" />
                                  <div>
                                      <p><strong>Verifiable Unique Ownership</strong></p>
                                      <p>Prove that ownership of an asset or security is globally unique</p>
                                  </div>

                                </div>
                              </div>
                              <div className="col-6 col-md-4">
                                <div className="carousel-box__item">
                                  <img src="icon-document-tracking.svg" />
                                  <div>
                                      <p><strong>Document History Tracking</strong></p>
                                      <p>Keep track of a sequence of changes and prove that only a single version of history exists</p>
                                  </div>

                                </div>
                              </div>
                              <div className="col-6 col-md-4">
                                <div className="carousel-box__item">
                                  <img src="icon-proof-of-existence.svg" />
                                  <div>
                                      <p><strong>Proof Of Existence</strong></p>
                                      <p>Trustless proof that data existed before a certain point in time</p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-6 col-md-4">
                                <div className="carousel-box__item">
                                  <img src="icon-proof-of-publication.svg" />
                                 <div>
                                     <p><strong>Proof Of Publication</strong></p>
                                     <p>Trustless proof that only one version of the data was notarised</p>
                                 </div>
                                </div>
                              </div>
                              <div className="col-6 col-md-4">
                                <div className="carousel-box__item">
                                  <img src="icon-provenance.svg" />
                                 <div>
                                     <p><strong>Provenance/Supply Chain Tracking</strong></p>
                                     <p>Verification of a single chain of custody and status changes</p>
                                 </div>
                                </div>
                              </div>
                              <div className="carousel-image__overlay footer">
                                <div className="carousel-image__buttons">
                                  <Button color="back" onClick={this.prevButton}>← Back</Button>
                                  <Button color="transparent" onClick={this.nextButton}>Learn how MainStay works →</Button>
                                </div>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="carousel-cell">
                    <div className="carousel-how-it-works">
                        <div className="container px-0">
                            <div className="row no-gutters">

                              <div className="col-12 col-md-4">
                                  <h1>How MainStay works?</h1>
                                  <ol>
                                      <li><strong>Generate cryptographic hash</strong> of your data</li>
                                      <li><strong>Commit hash</strong> using your slot authentication</li>
                                      <li>Your <strong>hash is attested</strong> into the Bitcoin blockchain</li>
                                      <li>Retrieve <strong>your proof</strong></li>
                                      <li>Compare and verify your <strong>cryptographic proof</strong></li>
                                  </ol>



                                <a href="https://commerceblock.readthedocs.io/en/latest/mainstay/index.html" target="_blank" className="carousel-how-it-works__button"><img src="icon-whitepaper.svg" /><span>Technical Documentation</span></a>
                              </div>
                              <div className="col-12 col-md-8 slide-3">
                                <img src="how-mainstay-works.png" className="mt-4 mt-md-0"/>
                              </div>
                              <div className="carousel-image__overlay footer">
                                <div className="carousel-image__buttons">
                                    <Button color="back" onClick={this.prevButton}>← Back</Button>
                                    <Button color="transparent" onClick={this.nextButton}>Pricing →</Button>
                                </div>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="carousel-cell">
                    <div className="carousel-pricing">
                        <div className="container px-0">
                            <div className="row no-gutters">
                              <div className="col"><h1>Sign-up to MainStay and start<br/> generating your data proofs</h1></div>
                            </div>
                            <div className="row no-gutters">
                              <div className="col">
                              <div className="row carousel-pricing__price">
                                <p><p>Free tier</p><span>£</span><span>0</span><span>/Month</span></p>
                              </div>
                              <div className="col text-center mb-1 mt-3">
                                <p className="carousel-pricing__feature"><img src="icon-check.svg" /><span>Allocated slot ID</span></p>
                                <p className="carousel-pricing__feature"><img src="icon-check.svg" /><span>One attestation per day</span></p>
                                <Button color="success" onClick={this.toggleSignUpModal}>
                                    Sign Up
                                </Button>
                              </div>
                              </div>

                              <div className="col">
                              <div className="row carousel-pricing__price">
                                <p><p>Standard</p><span>£</span><span>20</span><span>/Month</span></p>
                              </div>
                              <div className="col text-center mb-1 mt-3">
                                <p className="carousel-pricing__feature"><img src="icon-check.svg" /><span>Allocated slot ID</span></p>
                                <p className="carousel-pricing__feature"><img src="icon-check.svg" /><span>Hourly attestations</span></p>
                                <Button color="success" onClick={this.toggleSignUpModal}>
                                    Sign Up
                                </Button>
                              </div>
                              </div>

                              <div className="col">
                              <div className="row carousel-pricing__price">
                                <p><p>Intermediate</p><span>£</span><span>40</span><span>/Month</span></p>
                              </div>
                              <div className="col text-center mb-1 mt-3">
                                <p className="carousel-pricing__feature"><img src="icon-check.svg" /><span>Hourly attestations</span></p>
                                <p className="carousel-pricing__feature"><img src="icon-check.svg" /><span>10 additions per hour</span></p>
                                <Button color="success" onClick={this.toggleSignUpModal}>
                                    Sign Up
                                </Button>
                              </div>
                              </div>

                              <div className="col">
                              <div className="row carousel-pricing__price">
                                <p><p>Enterprise</p><span>£</span><span>80</span><span>/Month</span></p>
                              </div>
                              <div className="col text-center mb-1 mt-3">
                                <p className="carousel-pricing__feature"><img src="icon-check.svg" /><span>Hourly attestations</span></p>
                                <p className="carousel-pricing__feature"><img src="icon-check.svg" /><span>1000 additions per hour</span></p>
                                <Button color="success" onClick={this.toggleSignUpModal}>
                                    Sign Up
                                </Button>
                              </div>
                              </div>

                            </div>
                        </div>
                    </div>
                </div>
                </Flickity>
              </div>
                <div className="col-12 col-lg-6 login">

                    <Login/>

                </div>
              <div className="col-12 col-lg-6 mainstayinfo">

                  <MainstayInfo/>
              </div>


              <SignUpModal
                  isOpen={this.state.modalLogin}
                  onModalClose={this.toggleSignUpModal}
                  onSuccess={this.onSignUpSuccess}
                  onError={this.onSignUpError}
              />
            </div>
        );
    }
}

export default Home;
