const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			host: "smtp.mailgun.org",
			service: process.env.SERVICE,
			port: Number(587),
			secure: Boolean(process.env.SECURE),
			auth: {
				user: "postmaster@sandboxc198708654ab4a838970bbccc25d9a18.mailgun.org",
				pass: "db6290135e8428a36694f2b82f812cbd-bdb2c8b4-2df3a209",
			},
		});
        console.log(transporter)

		await transporter.sendMail({
			from: "fogration.acl@gmail.com",
			to: email,
			subject: subject,
			text: text,
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};

