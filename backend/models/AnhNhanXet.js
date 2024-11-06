const query = require ("../services/QueryService")
const chiTietDonHang = require ("../utils/constants/ChiTietDonHangConstant")
const anhNhanXet = require ("../utils/constants/AnhNhanXetConstant")
class AnhNhanXet 
{
    async get ()
    {
        return await query.select ("*",anhNhanXet.tableName)
    }

    async getByComment (obj)
    {
        return await query.select ("*",anhNhanXet.tableName, `where ${anhNhanXet.maMonAn} = ? and ${anhNhanXet.maNguoiMua} = ?`,[obj[anhNhanXet.maMonAn],obj[anhNhanXet.maNguoiMua]])
    }

    async add (obj)
    {
        return await query.insertArrayWithManualPrimaryKey (anhNhanXet.tableName,[anhNhanXet.maMonAn,anhNhanXet.maNguoiMua,anhNhanXet.anh],obj)
    }

    async update (obj)
    {
        return await query.update (anhNhanXet.tableName,obj,`where ${anhNhanXet.maNguoiMua} = ? and ${anhNhanXet.maMonAn} = ?`, [obj[anhNhanXet.maNguoiMua],obj[anhNhanXet.maMonAn]], [anhNhanXet.maDonHang,anhNhanXet.maMonAn])   
    }
    
    async removeByComment (obj)
    {
        return await query.remove (anhNhanXet.tableName,`where ${anhNhanXet.maNguoiMua} = ? and ${anhNhanXet.maMonAn} = ?`,[obj[anhNhanXet.maNguoiMua],obj[anhNhanXet.maMonAn]])
    }


}


module.exports = new AnhNhanXet