export async function fetchCountry(country: string) {
    const res = await fetch(country);
    const data = await res.json();
    return data.name;
}