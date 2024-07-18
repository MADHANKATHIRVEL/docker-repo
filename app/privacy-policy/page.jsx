import dynamic from "next/dynamic";
import "./privacy-policy.css";

const SEO = dynamic(() => import("@/components/seo/SEO"));

const PrivacyPolicy = () => {
  return (
    <>
      <SEO titleTemplate={"Privacy Policy"} />
      <div className="privacy-policy-page">
        <h2>PRIVACY POLICY</h2>
        <div className="privacy-content">
          <span className="policy-content">
            This Privacy Policy (&quot;Policy&quot;) elucidates the principles
            governing the collection, utilization, disclosure, and transfer of
            your information by <strong>“Albionpropertyhub”</strong> &amp;{" "}
            <strong>Albion Investments &amp; Holdings Private Limited</strong>{" "}
            and/or its subsidiary(ies) and/or affiliate(s) (collectively
            referred to as the &quot;Company&quot;). The Company operates
            various websites, including sub-sites, platforms, applications,
            m-web platforms, and other platforms (collectively referred to as
            &quot;Sites&quot;) for delivering information, products, offerings,
            and content via any mobile or internet-connected device or otherwise
            (collectively the &quot;Services&quot;).
          </span>
          <br />
          <br />
          <span className="policy-content">
            This Policy is an integral component of the Terms of Use and other
            terms on the Site (&quot;Terms of Use&quot;). Terms that are
            capitalized herein but undefined shall carry the same meaning as
            attributed to them in the Terms of Use. The effectiveness of this
            policy commences from the date and time a user registers with the
            Site and accepts the terms and conditions outlined in the Site.
            Prior to using our Services, it is imperative to thoroughly read
            both this Privacy Policy and our Terms of Use.
            <br />
            <br />
            <strong>Albionpropertyhub</strong> holds a commitment to respecting
            the privacy of its users and safeguarding it comprehensively. In its
            endeavor to provide a rich and holistic internet experience,
            Albionpropertyhub offers a diverse repository of Online Sites and
            various community services. The information collected by
            Albionpropertyhub about the user comprises (a) information supplied
            by users and (b) information automatically tracked during navigation
            (Information).
            <br />
            <br />
            By utilizing the Albionpropertyhub website or its services, you
            implicitly consent to the collection, storage, use, transfer,
            sharing, and distribution of the personal information you provide
            for any of the services offered.
          </span>
          <p className="policy-header">
            Information Received, Collected, And Stored by The Company
          </p>
          <br />
          <span className="policy-content">
            <strong>A. Information Supplied By Users:</strong>
            <br />
            <br />
            Registration/Contact data: When registering or making contact on the
            Sites for the Service, users are requested to provide basic contact
            information such as name, sex, age, address, pin code, contact
            number, occupation, interests, and email address. If registering
            through other accounts like Facebook, Twitter, or Gmail, Information
            from such accounts may be retrieved.
            {/* Subscription or paid service
            data: If choosing any subscription or paid service, the Company or
            its payment gateway provider may collect purchase, address, or
            billing information, including credit card details.  */}
            In-app purchases are handled by mobile operating system platform
            providers. Voluntary information: Additional information may be
            collected when providing feedback, comments, changing content, email
            preferences, responding to surveys, or engaging in communications.
            Information Automatically Collected/Tracked While Navigation
            Cookies: &quot;Cookies&quot; or similar electronic tools may be used
            to improve site responsiveness, assigning each visitor a unique,
            random number as a User Identification (User ID) for understanding
            individual interests. Unless voluntarily identified, no personal
            information is obtained. Opting out: Users can opt-out using Ads
            Settings, overwriting the unique DoubleClick cookie ID with
            &quot;OPT_OUT.&quot; Log File Information:
            {/* Limited information about the computer&#39;s connection
            to the Internet, including IP address, is automatically collected.
            Clear GIFs: &quot;Clear GIFs&quot; (Web Beacons) may be used to
            track online usage patterns anonymously. */}
          </span>
          <p className="policy-header">Information from Other Sources:</p>
          <span className="policy-content">
            The Company may receive information about users from other sources,
            adding it to account information and treating it in accordance with
            this Policy. Demographic and other information: Other sources of
            demographic and information may be referenced to provide more
            targeted communications and promotions. LINKS TO THIRD-PARTY SITES /
            AD-SERVERS: The Sites may contain links to other websites or
            applications, governed by their respective privacy policies. The
            Company is not liable for the privacy practices of such sites.
          </span>
          <p className="policy-header">INFORMATION USED BY THE COMPANY</p>
          <span className="policy-content">
            Information supplied by users may be utilized for advertising
            purposes across various mediums. The data shared by users enables
            the company to enhance services, maintain, protect, and improve the
            overall user experience. Additionally, this information may be
            employed for marketing communications regarding services or
            third-party products. It's important to note that personally
            identifiable information already in the public domain is not
            considered sensitive.
          </span>
          <p className="policy-header">How Collected Data Is Used?</p>
          <span className="policy-content">
            Third-party advertising companies may serve ads when visiting or
            using Sites or Services, using information to provide relevant
            advertisements.
          </span>
          <p className="policy-header">Information Sharing : </p>
          <span className="policy-content">
            Personal information may be shared to conduct business, within group
            companies, or with third parties for various purposes outlined in
            the Policy.
          </span>
          <p className="policy-header">
            Accessing and Updating Personal Information:
          </p>
          <span className="policy-content">
            Users can access and update personal information, and the Company
            makes efforts to correct inaccuracies, subject to legal
            requirements.
          </span>
          <p className="policy-header">Information Security : </p>
          <span className="policy-content">
            Appropriate security measures are implemented to protect data
            against unauthorized access, alteration, disclosure, or destruction.
          </span>
          <p className="policy-header">Updates / Changes : </p>
          <span className="policy-content">
            The Policy may be modified to incorporate changes in technology or
            applicable law. Changes become effective immediately upon notice,
            posted on the Sites.
          </span>
          <p className="policy-header">Security : </p>
          <span className="policy-content">
            Commercially reasonable security measures are in place, but absolute
            protection is not guaranteed.
          </span>
          <p className="policy-header">
            Accuracy and Confidentiality of Account Information :{" "}
          </p>
          <span className="policy-content">
            Customers are responsible for maintaining accurate and confidential
            account information.
          </span>
          <p className="policy-header">Third-Party Websites : </p>
          <span className="policy-content">
            The Company is not liable for the misuse of information by
            third-party websites linked on the Site.
          </span>
          <p className="policy-header">Questions / Grievance Redressal : </p>
          <span className="policy-content">
            Users may address concerns or grievances to the designated Grievance
            Officers, whose contact information is provided in the Terms of Use.
            This Privacy Policy is subject to changes,
          </span>
          <p className="policy-header">User Permissions : </p>
          <span className="policy-content">
            In order to provide you with a seamless experience on Albion
            Property Hub and to facilitate the listing, sale, and purchase of
            properties, we may request certain permissions from you. Below, we
            outline the types of permissions we may ask for, why we need them,
            and why we may not need them.
          </span>
          <p className="policy-header">Personal Info : </p>
          <span className="policy-content">
            Name: We may ask for your name to personalize your experience on
            Albion Property Hub and to address you appropriately within our
            services. Email Address: Your email address is required for account
            verification, communication purposes, and to send you important
            updates regarding property listings and transactions. User IDs: We
            do not ask for user IDs as they are not essential for the
            functionality of our property management services. Address: Your
            address may be requested for location-based services, such as
            providing relevant local property listings or for property sale and
            purchase transactions. Phone Number: This may be requested for
            account verification, communication, and to provide you with
            additional security measures such as two-factor authentication. Race
            and Ethnicity, Political or Religious Beliefs, Sexual Orientation,
            Other Info: We do not request or require this sensitive personal
            information. We respect your privacy and believe such information is
            not necessary for the provision of our property management services.
          </span>
          <p className="policy-header">Location : </p>
          <span className="policy-content">
            Approximate Location: We may request access to your approximate
            location to offer location-based property listings, nearby property
            recommendations, or to tailor property search results based on your
            region. Precise Location: Precise location access may be requested
            for features like property mapping, navigation to property
            locations, or to assist in property viewings. However, we understand
            that you may not wish to share this information, and our services
            can still function without precise location data.
          </span>
          <p className="policy-header">Messages : </p>
          <span className="policy-content">
            Emails: Access to emails may be requested for communication purposes
            related to property listings, inquiries, and transactions. However,
            we do not access or store the content of your emails unless
            explicitly required for the functionality of our property management
            services. SMS and MMS: We may request access to SMS and MMS for
            features like two-factor authentication or to facilitate
            communication within our services. However, we do not access or
            store the content of your messages. Photos: We may request access to
            photos for the purpose of taking property photos and uploading them
            to Albion Property Hub for listing purposes. This helps in
            showcasing your property accurately to potential buyers or renters,
            enhancing the visibility and attractiveness of your listings.
          </span>
          <p className="policy-header">Files and Docs : </p>
          <span className="policy-content">
            Files and Docs: Access to files and documents may be requested for
            services such as document uploads related to property ownership,
            rental agreements, or property listings. We respect your privacy and
            do not access or store your files unless necessary for the
            functionality of our property management services.
          </span>
          <p className="policy-header">Calendar : </p>
          <span className="policy-content">
            Calendar Events: We may request access to your calendar events to
            provide reminders, schedule appointments, or to integrate with other
            services. Your calendar data is only accessed with your explicit
            consent and is not used for any other purpose.
          </span>
          <p className="policy-header">Contacts : </p>
          <span className="policy-content">
            Contacts: We may request access to your contacts for features such
            as sharing property listings with your contacts or inviting them to
            join Albion Property Hub. However, we do not store your contact
            information unless explicitly provided by you for the functionality
            of our property management services.
          </span>
          <p className="policy-header">Device or Other IDs : </p>
          <span className="policy-content">
            Device or Other IDs: We may collect device or other IDs for
            analytics, security purposes, or to ensure proper functioning of
            Albion Property Hub across different devices. However, we do not
            track or store personally identifiable information through these
            IDs. By using Albion Property Hub, you agree to the collection and
            use of your information as outlined in this Privacy Policy. We are
            committed to protecting your privacy and ensuring the security of
            your personal data. If you have any questions or concerns about our
            Privacy Policy or the use of your personal information, please
            contact us at{" "}
          </span>
          <a href="mailto:support@albionpropertyhub.com">
            support@albionpropertyhub.com
          </a>
          .
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
