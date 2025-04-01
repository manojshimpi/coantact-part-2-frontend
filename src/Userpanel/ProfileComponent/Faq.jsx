import React from 'react'

function Faq() {
  return (
   <>
<section className="section faq">
  <div className="row">
  <div className="card">
  <div className="card-body">
    <h5 className="card-title">Contact Directory FAQs</h5>
    <div className="accordion accordion-flush" id="faq-group-1">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button collapsed" data-bs-target="#faqsOne-1" type="button" data-bs-toggle="collapse">
            How can I search for a contact in the directory?
          </button>
        </h2>
        <div id="faqsOne-1" className="accordion-collapse collapse" data-bs-parent="#faq-group-1">
          <div className="accordion-body">
            You can search for contacts by entering their name, department, or job title in the search bar. The directory will show all matching results.
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button collapsed" data-bs-target="#faqsOne-2" type="button" data-bs-toggle="collapse">
            How can I update my contact information in the directory?
          </button>
        </h2>
        <div id="faqsOne-2" className="accordion-collapse collapse" data-bs-parent="#faq-group-1">
          <div className="accordion-body">
            To update your contact information, please log in to the directory and select "Edit Profile." From there, you can update your details and save them.
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button collapsed" data-bs-target="#faqsOne-3" type="button" data-bs-toggle="collapse">
            Can I contact someone through the directory?
          </button>
        </h2>
        <div id="faqsOne-3" className="accordion-collapse collapse" data-bs-parent="#faq-group-1">
          <div className="accordion-body">
            Yes, you can directly email or call contacts listed in the directory if their contact details are provided. Simply click on their name to view the contact options.
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button collapsed" data-bs-target="#faqsOne-4" type="button" data-bs-toggle="collapse">
            What should I do if I can't find a contact?
          </button>
        </h2>
        <div id="faqsOne-4" className="accordion-collapse collapse" data-bs-parent="#faq-group-1">
          <div className="accordion-body">
            If you can't find a contact, try refining your search or check with your team or HR for assistance in locating the right person.
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button collapsed" data-bs-target="#faqsOne-5" type="button" data-bs-toggle="collapse">
            Is the contact directory accessible outside the office?
          </button>
        </h2>
        <div id="faqsOne-5" className="accordion-collapse collapse" data-bs-parent="#faq-group-1">
          <div className="accordion-body">
            The directory may be accessible remotely depending on your organization's policies. Please check with your IT department for remote access options.
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  </div>
</section>

   </>
  )
}

export default Faq