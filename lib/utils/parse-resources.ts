type Resource = {
	label: string;
	href: string;
	domain: string;
};

export function parseResources(raw: string[]): Resource[] {
	return (raw ?? []).map(r => {
		const match = /^\[(?<label>.+?)\]\((?<href>.+?)\)$/v.exec(r);
		if (!match?.groups) {
			return {label: r, href: r, domain: ''};
		}

		const {label, href} = match.groups;
		try {
			const domain = new URL(href).hostname.replace(/^www\./v, '');
			return {label, href, domain};
		} catch {
			return {label, href, domain: ''};
		}
	});
}
