export class Field {
    id = 0;
    name = '';
    tag = '';
    category = '';
    selected = false;
}

export const fields: Field[] = [ 
    { name: 'Board Meeting', tag: 'Board Meeting', category: 'agency_name', selected: false, id: 1 },
    { name: 'Housing Authority', tag: 'Housing Authority', category: 'agency_name', selected: false, id: 2 },
    { name: 'Housing Preservation & Development', tag: 'HOUSING PRESERVATION & DVLPMNT', category: 'agency_name', selected: false, id: 3 },
    { name: 'Parks & Recreation Department', tag: 'DEPT OF PARKS & RECREATION', category: 'agency_name', selected: false, id: 4 },
    { name: 'Design & Construction', tag: 'Design and Construction', category: 'agency_name', selected: false, id: 5 },
    { name: 'Procurement', tag: 'Procurement', category: 'section_name', selected: false, id: 6 },
    { name: 'Construction/Construction Services', tag: 'Construction/Construction Services', category: 'category_description', selected: false, id: 7 },
    { name: 'Award', tag: 'Award', category: 'type_of_notice_description', selected: false, id: 8 },
    { name: 'Intent to Award', tag: 'Intent to Award', category: 'type_of_notice_description', selected: false, id: 9 },
    { name: 'Solicitation', tag: 'Solicitation', category: 'type_of_notice_description', selected: false, id: 10 },
    { name: 'Request for Proposals', tag: 'Request for Proposals', category: 'selection_method_description', selected: false, id: 11 },
    { name: 'Competitive Sealed Bids', tag: 'Competitive Sealed Bids', category: 'selection_method_description', selected: false, id: 12 },
    { name: 'Competitive Sealed Proposals', tag: 'Competitive Sealed Proposals', category: 'selection_method_description', selected: false, id: 13 },
    { name: 'Negotiated Acquisition', tag: 'Negotiated Acquisition', category: 'selection_method_description', selected: false, id: 14 },
    { name: 'Demonstration Project', tag: 'Demonstration Project', category: 'selection_method_description', selected: false, id: 15 }
]
