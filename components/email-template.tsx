import { Html, Text } from "@react-email/components";

interface EmailTemplateProps {
  name: string;
}

export function EmailTemplate({ name }: EmailTemplateProps) {
  return (
    <Html lang="en">
      <Text>Kepada Yth. **{name}**:</Text>
      <Text>
        Merujuk pada data pencapaian operasional untuk periode kami melihat
        bahwa kinerja Anda tercatat sebesar %. Angka ini berada di bawah target
        minimum yang telah ditetapkan (50%). Kami berkomitmen untuk memberikan
        **dukungan penuh** untuk membantu Anda kembali mencapai target. Tujuan
        dari pertemuan ini adalah untuk mengidentifikasi tantangan spesifik yang
        Anda hadapi dan menyusun rencana perbaikan yang terukur.
      </Text>
      <Text>Hormat kami,</Text>
    </Html>
  );
}
