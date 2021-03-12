import React, { useEffect, useState } from 'react';
import { match, RouteComponentProps } from 'react-router-dom';
import { getPets } from '../../api/PetAPI';
import { MDBRow, MDBCol, MDBIcon } from 'mdbreact';
import './Home.css';
import img from '../../images/AdoptionDog.jpg';
import bannerimg from '../../images/BannerHomePage.jpg';
import { MDBMask, MDBView } from 'mdbreact';
import PetGrid from '../PetGrid/PetGrid';
import adoptMeImg from '../../images/AdoptMeImg.jpg';


interface Props extends RouteComponentProps {
  match: match<{ petId: string }>;
}

export const Home: React.FC<Props> = () => {
  const [pets, setPets] = useState<IPet[]>([]);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = (): void => {
    getPets('', { property: 'createdAt', isDescending: true }, [
      { property: 'animalType', selectedValue: '', values: ['Dog', 'Cat'] },
      { property: 'age', selectedValue: '', values: ['Puppy', 'Young', 'Adult', 'Senior'] },
      { property: 'gender', selectedValue: '', values: ['Male', 'Female'] },
      { property: 'breed', selectedValue: '', values: [] },
    ])
      .then(({ data: { pets } }: IPet[] | any) => setPets(pets))
      .catch((err: Error) => console.log(`err on fetchPets: ${err}`));
  };

  return (
    <div>
      <MDBView id="view-background" src={bannerimg}>
        <MDBMask className="flex-center flex-column text-white text-center"></MDBMask>
      </MDBView>

      <PetGrid pets={pets} count={8} numOfCols={4} />
      <section className="my-5">
        <h1 className="h1-responsive font-weight-bold text-center my-5"> Pet Adoption Tips</h1>
        <h3 className="h3-responsive font-weight-bold text-left my-5"> Why Adopt a Dog or Cat Over Buying?</h3>
        <p className="lead font-weight-light w-responsive text-left mb-5">
          Did you know that over 1,000 people per hour run a search right here looking to adopt a pet? Pet adoption is quickly becoming the preferred way to
          find a new dog, puppy, cat or kitten. Best of all, there are so many benefits when you adopt a dog or adopt a cat over buying. For instance, pet
          adoption will almost always be more affordable than buying a puppy for sale from a breeder or finding a kitten for sale from a litter. There are more
          benefits as well. Since pets in rescues and shelters usually come from a home where the owners ran out of money, got divorced, or had to move, it's
          common to find that the dogs and cats on our website are already housetrained, good with kids, or do well with other pets. People are finding out that
          buying a puppy for sale from a breeder isn't all it's cracked up to be, and the dogs and cats don't leave the organization without having their shots
          and being taken to the vet. That means less stress, and more savings! So what are you waiting for? Go find that perfect pet!
        </p>
        <h3 className="h3-responsive font-weight-bold text-left my-5"> The Experts & Tools You Need to Find the Perfect Pet</h3>
        <p className="lead font-weight-light w-responsive text-left mb-5">
          Have you addressed what type of pet personality you are looking for? Wait a second, did we just say personality, and not breed? Yes, that is right.
          Finding the ideal pet for yourself or family should start with an understanding of the ideal pet personality. Consider this, do you need a dog that is
          low key and good with kids, or are you looking for an energetic pal who is into trail running? Perhaps a cat that will get along well with others is
          what you need. The dog rescues and cat rescues that post hundreds of local pets near you are experts at matching you with a dog or cat who will love
          the life you can provide. This is why so many people are realizing focusing on dog adoption and cat adoption from a rescue is the ideal pet search
          process. Best of all, our website has a feature called "New Pet Alert." Simply tell us what you are looking for and we will email you when that
          perfect pet is available! So even if you've made the commitment to adopt a puppy or adopt a kitten, we will email you immediately when we know of a
          local little furry fellow who is in need of a new home!
        </p>
        <h1 className="h1-responsive font-weight-bold text-center my-5">Top reasons to adopt a pet</h1>
        <h3 className="h3-responsive font-weight text-center my-5">Thinking of adding a pet to your family? Here are 5 reasons to adopt your new best friend.</h3>
        <MDBRow>
          <MDBCol lg="8">
            <MDBRow className="mb-3">
              <MDBCol size="1">
                <MDBIcon icon="share" size="lg" className="indigo-text" />
              </MDBCol>
              <MDBCol xl="10" md="11" size="10">
                <h5 className="font-weight-bold mb-3">Because you'll save a life.</h5>
                <p className="lead font-weight-light">
                Each year, it's estimated that more than one million adoptable dogs and cats are euthanized in the United States, simply because too many pets come into shelters and too few people consider adoption when looking for a pet.
                </p>
              </MDBCol>
            </MDBRow>
            <MDBRow className="mb-3">
              <MDBCol size="1">
                <MDBIcon icon="share" size="lg" className="indigo-text" />
              </MDBCol>
              <MDBCol xl="10" md="11" size="10">
                <h5 className="font-weight-bold mb-3">Because you'll get a great animal.</h5>
                <p className="lead font-weight-light">
                Animal shelters and rescue groups are brimming with happy, healthy pets just waiting for someone to take them home. Most shelter pets wound up there because of a human problem like a move or a divorce, not because the animals did anything wrong. Many are already house-trained and used to living with families.
                </p>
              </MDBCol>
            </MDBRow>
            <MDBRow className="mb-3">
              <MDBCol size="1">
                <MDBIcon icon="share" size="lg" className="indigo-text" />
              </MDBCol>
              <MDBCol xl="10" md="11" size="10">
                <h5 className="font-weight-bold mb-3">Because your home will thank you.</h5>
                <p className="lead font-weight-light">
                Many of the pets from shelters and rescues are already house-trained, which means you’re not only saving a pet’s life, you may be saving your rug. Adopting a mature pet not only gives older animals a second chance, it often means introducing them to your family will be much easier.
                </p>
              </MDBCol>
            </MDBRow>
            <MDBRow className="mb-3">
              <MDBCol size="1">
                <MDBIcon icon="share" size="lg" className="indigo-text" />
              </MDBCol>
              <MDBCol xl="10" md="11" size="10">
                <h5 className="font-weight-bold mb-3">Because adoption helps more than just one animal.</h5>
                <p className="lead font-weight-light">
                Overburdened shelters take in millions of stray, abused and lost animals every year, and by adopting an animal, you’re making room for others. Not only are you giving more animals a second chance, but the cost of your adoption goes directly towards helping those shelters better care for the animals they take in!                </p>
              </MDBCol>
            </MDBRow>
            <MDBRow className="mb-3">
              <MDBCol size="1">
                <MDBIcon icon="share" size="lg" className="indigo-text" />
              </MDBCol>
              <MDBCol xl="10" md="11" size="10">
                <h5 className="font-weight-bold mb-3">Because you'll change a homeless animal's whole world.</h5>
                <p className="lead font-weight-light">
                And get a new best friend out of the deal. Seriously, what could be better than that?                </p>
              </MDBCol>
            </MDBRow>
          </MDBCol>
          <MDBCol lg="4" className="text-center text-lg-left">
            <img className="HomeImage" src={img} alt="" />
            <img className="HomeImage" src={adoptMeImg} alt="" />
          </MDBCol>
        </MDBRow>
      </section>
    </div>
  );
};

export default Home;
