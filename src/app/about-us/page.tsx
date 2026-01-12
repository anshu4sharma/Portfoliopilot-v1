export default function AboutUsPage() {
    return (
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            About Us
          </h1>
          <p className="mt-4 text-muted-foreground">
            Welcome to <strong>PortfolioPilot</strong>, the ultimate platform designed to help developers create stunning portfolios and showcase their skills and projects to the world. We are here to help you level up your online presence and stand out in the developer community.
          </p>
        </div>
  
        {/* Our Mission */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            At PortfolioPilot, our mission is simple: to help developers build beautiful, professional portfolios that reflect their skills and passion. Whether you're a beginner or an experienced developer, we provide all the tools you need to showcase your work, track your progress, and get noticed by potential clients or employers.
          </p>
        </div>
  
        {/* What We Offer */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground">What We Offer</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            PortfolioPilot is packed with features to make portfolio creation simple, effective, and personalized:
          </p>
          <ul className="mt-4 list-disc list-inside text-muted-foreground">
            <li><strong>Custom Subdomain:</strong> Get your personalized username.portfoliopilot.in domain.</li>
            <li><strong>SEO Optimization:</strong> Built-in tools to help your portfolio rank higher in search results.</li>
            <li><strong>Advanced Customization:</strong> Unlimited design options and section layouts to match your unique style.</li>
            <li><strong>Analytics Dashboard:</strong> Track visitor engagement and portfolio performance with ease.</li>
            <li><strong>All Portfolio Sections:</strong> Access all sections like Hero, Projects, Skills, Experience, and more.</li>
            <li><strong>Regular Updates:</strong> Receive the latest features and improvements first.</li>
          </ul>
        </div>
  
        {/* Why Choose Us */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground">Why Choose PortfolioPilot?</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            At PortfolioPilot, we understand that having a professional, polished online portfolio is key to getting noticed. Here’s why you should choose us:
          </p>
          <ul className="mt-4 list-disc list-inside text-muted-foreground">
            <li><strong>Build credibility:</strong> Get a professional custom domain and stand out from the crowd.</li>
            <li><strong>Get discovered:</strong> Our SEO tools are designed to help you rank higher and reach more people.</li>
            <li><strong>Track and improve:</strong> Analytics help you track your visitors, understand user behavior, and optimize your portfolio.</li>
            <li><strong>Stand out:</strong> Customize your portfolio with unique layouts, sections, and designs.</li>
            <li><strong>Access premium features:</strong> Unlock a full range of sections, layouts, and regular updates with our Pro Plan.</li>
            <li><strong>Priority support:</strong> Get the help you need, when you need it.</li>
          </ul>
        </div>
  
        {/* Pro Plan Details */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground">Pro Plan Benefits</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Unlock all features with our Pro Plan and take your portfolio to the next level for just ₹99.
          </p>
          <ul className="mt-4 list-disc list-inside text-muted-foreground">
            <li>Custom Subdomain (username.portfoliopilot.in)</li>
            <li>Unlimited Custom Subdomain Changes</li>
            <li>5+ Layouts for Each Section</li>
            <li>SEO Optimization</li>
            <li>Portfolio Analytics</li>
            <li>Customizable Design for Each Section</li>
            <li>Regular Updates with New Features</li>
          </ul>
        </div>
  
        {/* Contact Us */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-foreground">Contact Us</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Have any questions or want to know more about our features? Feel free to reach out to us:
          </p>
          <p className="mt-4 text-muted-foreground">
            <strong>Email:</strong>{" "}
            <a
              href="mailto:support@portfoliopilot.in"
              className="text-primary underline"
            >
              support@portfoliopilot.in
            </a>
          </p>
        </div>
      </div>
    );
  }
  