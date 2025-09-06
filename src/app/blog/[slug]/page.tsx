import { BlogDetailPage } from '@/components/sections/BlogDetailPage';

// Mock data for demonstration - replace with actual CMS data
const mockBlogPost = {
  id: '1',
  title:
    'laminate-va-veneer-hai-be-mat-phu-go-cong-nghiep-pho-bien-trong-noi-that-hien-dai',
  subject:
    'Laminate và Veneer – Hai bề mặt phủ gỗ công nghiệp phổ biến trong nội thất hiện đại',
  image: '/images/blog-hero.jpg',
  content: `
    <h2>1. Giới thiệu chung</h2>
    <p>Laminate và Veneer là 2 loại bề mặt phủ lên gỗ công nghiệp phổ biến trong ngành nội thất hiện nay. Laminate là vật liệu nhân tạo được sản xuất từ nhiều lớp giấy kraft và giấy trang trí, trong khi Veneer là lớp gỗ tự nhiên mỏng được lạng từ cây tự nhiên.</p>
    
    <blockquote>
      "Chọn đúng vật liệu bề mặt không chỉ ảnh hưởng đến độ bền của sản phẩm mà còn quyết định ấn tượng thẩm mỹ của toàn bộ không gian." – An Cường
    </blockquote>
    
    <h2>2. Laminate – Bền bỉ và đa dạng mẫu mã</h2>
    
    <h3>Đặc điểm nổi bật:</h3>
    <ul>
      <li>Cấu tạo từ nhiều lớp giấy kraft và giấy trang trí ép dưới áp suất & nhiệt độ cao.</li>
      <li>Khả năng chống trầy xước, chống ẩm, chịu va đập tốt.</li>
      <li>Dễ vệ sinh, bảo dưỡng, giữ được vẻ đẹp lâu dài.</li>
      <li>Mẫu mã phong phú, có thể giả vân gỗ, vân đá, màu trơn hoặc hiệu ứng đặc biệt.</li>
    </ul>
    
    <h3>Phù hợp cho:</h3>
    <ul>
      <li>Khu vực có tần suất sử dụng cao: tủ bếp, bàn làm việc, quầy lễ tân, nội thất thương mại.</li>
    </ul>
    
    <img src="/placeholder-blog-content.jpg" alt="Laminate surface examples" />
    
    <h2>3. Veneer – Sang trọng và tự nhiên</h2>
    
    <h3>Đặc điểm nổi bật:</h3>
    <ul>
      <li>Lớp gỗ mỏng được lạng trực tiếp từ thân cây tự nhiên.</li>
      <li>Giữ nguyên vân gỗ và màu sắc nguyên bản, mang lại vẻ sang trọng, đẳng cấp.</li>
      <li>Cảm giác ấm áp, gần gũi khi chạm tay.</li>
    </ul>
    
    <h3>Hạn chế:</h3>
    <ul>
      <li>Khả năng chống ẩm, chống trầy kém hơn Laminate.</li>
      <li>Cần bảo quản kỹ, tránh tiếp xúc trực tiếp với nước và vật sắc nhọn.</li>
    </ul>
  `,
  date_created: '08/08/2025',
};

const mockRelatedPosts = [
  {
    id: '2',
    title: '5 Lý Do Nên Chọn Gỗ Nhựa Cho Không Gian Ngoại Thất',
    excerpt:
      'Từ sân vườn, ban công đến hồ bơi – gỗ nhựa là lựa chọn hoàn hảo cho không gian ngoài trời bền đẹp và tinh tế.',
    date: '07/08/2025',
    category: 'Gỗ Nhựa WPC',
    imageUrl: '/placeholder-blog.jpg',
  },
  {
    id: '3',
    title: 'Dây Chuyền Sản Xuất Gỗ Nhựa VINA – Công Nghệ Đồng Bộ Chuẩn Quốc Tế',
    excerpt:
      'Cùng tìm hiểu quy trình sản xuất hiện đại và cam kết chất lượng vượt trội của thương hiệu VINA WPC.',
    date: '06/08/2025',
    category: 'Gỗ Nhựa WPC',
    imageUrl: '/placeholder-blog.jpg',
  },
];

interface BlogDetailProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogDetail({ params }: BlogDetailProps) {
  const { slug } = await params;

  // In a real app, you would fetch the post data based on the slug
  // const post = await getBlogPost(slug);
  // const relatedPosts = await getRelatedPosts(post.category, post.id);

  return (
    <main className="page-container bg-white">
      <BlogDetailPage post={mockBlogPost} relatedPosts={mockRelatedPosts} />
    </main>
  );
}
